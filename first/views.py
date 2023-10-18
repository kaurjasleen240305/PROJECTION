from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view,action,permission_classes
from django.shortcuts import redirect
from django.http import Http404
import os
import requests
from dotenv import load_dotenv
from .models import User,Project,Card_Subtask,Card,List
from django.db.models import Prefetch
from django.contrib.auth import login
from django.contrib.auth import authenticate,logout
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import SessionAuthentication
from .serializers import ProjectModelSerializer,ProjectListModelSerializer,Card_subtaskSerializer,CombinedSerializer,CardSerializer,UserSerializer,UserPartialUpdateSerializer,Procreser,ListModelSerializer,ListCreateSerializer,Card_createSerializer,UserInfoSerializer
from rest_framework import viewsets,status,permissions
load_dotenv()


CLIENT_ID=os.environ.get("CLIENT_ID")
REDIRECT_URI=os.environ.get("redirect_uri1")
BACK_URI=os.environ.get("back_uri1")
STRING=os.environ.get("redirect_string")
CLIENT_SECRET_ID=os.environ.get("client_secret_id")
FRONTEND_HOST=os.environ.get("frontend_host")
BACKEND_HOST=os.environ.get("BACKEND_HOST")


@api_view(['GET'])
@permission_classes([AllowAny])
def login_direct(request):
    SITE = f'https://channeli.in/oauth/authorise/?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&state="Success/'
    return redirect(SITE)
    

@api_view(["GET"])
@permission_classes([])
def check_login(request):
    print("Hello")
    content={"Logged_In":False}
 #   print(request.COOKIES['sessionid'])
    print(request.COOKIES)
    if "sessionid" in request.COOKIES:
       user_info={
          "username":request.session.get("username"),
          "name":request.session.get("name"),
          "email":request.session.get("email"),
          "is_member":request.session.get("is_member"),
          "enrolment_no":request.session.get("enrolment_no"),
          "year":request.session.get("year"),
          "is_admin":request.session.get("is_superuser")
       } 
       content={"Logged_In":True,"user":user_info}
    return Response(content)



def auth(username,enrolment_number, name, year, email,is_Member ):
    try:
        user = User.objects.get(username=username)
        print("Exists")
        return user

    except User.DoesNotExist:
        print("Not Exists")
        User.objects.create(username=username, name=name, email=email,
                            year=year, enrolment_no=enrolment_number,is_Member=is_Member)
        #print("Created"
        user = User.objects.get(username=username)
        return user

# @api_view(['GET'])
# def check_login(request):
#    if "sessionid" in request.COOKIES:
#        return Response("LOGGED IN")
#    else:
#       return Response("NOT LOGGED IN")


@api_view(['GET'])
@permission_classes([AllowAny])
def get_token(request):
   try:
    auth_code=request.GET.get('code')
    params_post={
      "client_id":CLIENT_ID,
      "client_secret":CLIENT_SECRET_ID,
      "grant_type":"authorization_code",
      "redirect_uri":REDIRECT_URI,
      "code":auth_code,
    }
    response=requests.post("https://channeli.in/open_auth/token/",params_post)
    access_token=response.json().get("access_token")
    token_type=response.json().get("token_type")
    params_get={
      "Authorization":f"{token_type} {access_token}"
    }
    response=requests.get("https://channeli.in/open_auth/get_user_data/",headers=params_get)
  # print(response.json())
    user_info=response.json()
    username= user_info['username']
    name=user_info["person"]['fullName']
    year=user_info['student']['currentYear']
    email=user_info['contactInformation']['emailAddress']
    enrolment_no=user_info['student']['enrolmentNumber']


    is_Member=False
    for i in user_info['person']['roles']:
        if(i['role']=="Maintainer"):
           is_Member=True
           break
    if (is_Member==True ):
      try:
         user=auth(username,enrolment_no,name,year,email,is_Member)
         print(user)
      except:
         return Response("unable to create user")
      try:
        login(request,user)
        request.session['username'] = username
        request.session['name'] = name
        request.session['year'] = year
        request.session['email'] = email
        request.session['enrolment_no'] = enrolment_no
        request.session['is_Member'] = is_Member
        request.session['is_admin']=user.is_superuser
        print(FRONTEND_HOST)
        return redirect(f'{FRONTEND_HOST}dashboard')
  #      return Response("LOGGED IN")
      except:
         return Response("Not logged in successfully")
   ##      return Response("Not logged in successfully")
    else:
      return Response("Not an IMG member")
    
   except:
      SITE = f'https://channeli.in/oauth/authorise/?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&state="Success/'
      return redirect(SITE)
   

@api_view(['POST'])
def login_password(request):
   username=request.data['username']
   password=request.data['password']
   user=authenticate(request,username=username,password=password)
   if user is not None:
      login(request,user)
      request.session['username']=username
      return Response({"message":"LOGGED IN SUCCESSFULLY"})
   return Response({"message":"USER IS NOT AUTHENTICATED"})


@api_view(['GET'])
def logout_pass(request):
   logout(request)
   return Response({"message":"LOGGED OUT SUCCESSFULLY"}, status=status.HTTP_200_OK)


def room(request,card_id):
   return render(request,"first/index.html",{"card_id":card_id})


###permissions
class is_member_admin_creator(permissions.BasePermission): 
   def has_object_permission(self,request,view,obj):
      cond1=request.session.get("username")
      print(cond1)
      cond2=obj.pid.project_members.filter(username=(request.session.get("username"))).exists()
      print(cond2)
      cond3=obj.pid.creator==(request.session.get("username"))
      print(cond3)
      result=(cond1 or cond2 or cond3)
      return False
##TO SEE WHETHER ONE PERMSSION FOR PROEJCT,LIST,CARD CAN BE CREATED OR NOT 
class is_member_admin_creator_card(permissions.BasePermission): 
   def has_object_permission(self,request,view,obj):
      cond1=request.session.get("username")
      print(cond1)
      cond2=obj.lid.pid.project_members.filter(username=(request.session.get("username"))).exists()
      print(cond2)
      cond3=obj.lid.pid.creator.username==(request.session.get("username"))
      print(cond3)
      result=(cond1 or cond2 or cond3)
      return result
   



####VIEWSETS

class UserViewSet(viewsets.ModelViewSet):
     queryset=User.objects.all()
     serializer_class=UserSerializer
     authentication_classes=[SessionAuthentication]
     permission_classes=[IsAuthenticated]
     lookup_field='username'

     def list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
     
     
     def detail(self, request):
        try:
            user =self.get_object()
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)
        
     def update(self,request,*args,**kwargs):
        username=kwargs.get('username')
        user=self.get_object()
        if user.username != username:
            return Response({'message': 'Username in URL does not match the object.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=Http404)





class ProjectViewSet(viewsets.ModelViewSet):
   queryset=Project.objects.all()
   serializer_class=ProjectModelSerializer
   authentication_classes=[SessionAuthentication]
   permission_classes=[IsAuthenticated]
   

   def list(self, request, *args, **kwargs):
      projects=Project.objects.all()
      serializer=ProjectListModelSerializer(projects,many=True)
      return Response(serializer.data)
   
   def retrieve(self,request,pk):
      try:
         project = Project.objects.get(pk=pk)
      except project.DoesNotExist:
         return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
      serializer = ProjectModelSerializer(project)
      return Response(serializer.data)
   
   def create(self,request,*args,**kwargs):
      copy=request.data.copy()
      copy["creator"]=request.session.get("username")
      print(request.session.get("session_id"))
      serializer=Procreser(data=copy)
      if serializer.is_valid():
         serializer.save()
         project=Project.objects.get(project_name=copy['project_name'])
         ac_serializer=ProjectListModelSerializer(project)
         return Response(ac_serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
  ## TO OVERRIDE DELETE ACCORDING TO PROJECT MEMBERS ONLY AND ADMINS CAN DELETE

   def destroy(self,request,*args,**kwargs):
      ins=self.get_object()
      cond1=request.session.get("is_superuser")
      cond2=(ins.creator==(request.session.get("username")))
      cond3=ins.is_member(username=request.session.get("username"))
      if(cond1 or cond3 or cond2):
         ins.delete()
         return Response({"message":"PROJECT DELETED SUCCESSFULLY"})
      return Response({"message":"YOU CANNOT DELETE THIS PROJECT"})
   
   @action(detail=True,methods=["POST",])
   def add_member(self,request,*args,**kwargs):
      project_instance=self.get_object()
      username=request.data['username']
      user=User.objects.get(username=username)
      cond2=(project_instance.creator==(request.session.get("username")))
      if(cond2):
         project_instance.project_members.add(user)
         return Response({"message":f'{username} added Successfully to this project'})
      return Response({"message":"You dont have access to add member to this Project"})
   
   

   
class ListViewSet(viewsets.ModelViewSet):
     queryset=List.objects.all()
     serializer_class=ListModelSerializer
     authentication_classes=[SessionAuthentication]
     permission_classes=[IsAuthenticated]
     #def get_permission(self):
     #   if self.action in ['create','destroy','update']:
     #      obj=self.get_object()
     #      permission_classes=[is_member_admin_creator,IsAuthenticated]
     #   else:
     #      permission_classes=[IsAuthenticated]
     #   return permission_classes
     
     def create(self,request,*args,**kwargs):
       current_user=User.objects.get(username=(request.session.get("username")))
       current_project=Project.objects.get(pk=(request.data['pid']))
       cond1=current_user.is_superuser
       cond2=current_project.project_members.filter(username=(request.session.get("username"))).exists()
       cond3=current_project.creator==(request.session.get("username"))
       print(request.session.get("username"))
       result=(cond1 or cond2 or cond3)
       if(result):
        serializer=ListCreateSerializer(data=request.data)
        if serializer.is_valid():
               serializer.save()
               return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
       return Response({"error":"YOU DONT HAVE ACCESS TO CREATE PROJECT"})
     


class CardViewSet(viewsets.ModelViewSet):
   queryset=Card.objects.all()
   serializer_class=CardSerializer
   authentication_classes=[SessionAuthentication]
   permission_classes=[IsAuthenticated]

   def create(self,request,*args,**kwargs):
       current_user=User.objects.get(username=(request.session.get("username")))
       current_list=List.objects.get(pk=request.data['lid'])
       current_project=Project.objects.get(pk=current_list.pid.pk)
       cond1=current_user.is_superuser
       cond2=current_project.project_members.filter(username=(request.session.get("username"))).exists()
       cond3=(current_project.creator.username)==(request.session.get("username"))
       result=(cond1 or cond2 or cond3)
       if(result):
          data_copy=request.data.copy()
          data_copy["completion_status"]=0
          serializer=Card_createSerializer(data=data_copy)
          if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
          return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
       return Response({"message":"NO ACCESS TO ADD CARD"})
   

   
   
          

   
   
     
    
     
     

      
     
     









   
   
            


      


        
        
     

     
        
            
        



