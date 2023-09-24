from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect
import requests
from django.http import HttpRequest
import os
from dotenv import load_dotenv
from first.models import User
from django.contrib.auth import login
from django.contrib.auth import authenticate


load_dotenv()


CLIENT_ID=os.environ.get("CLIENT_ID")
REDIRECT_URI=os.environ.get("redirect_uri1")
STRING=os.environ.get("redirect_string")
CLIENT_SECRET_ID=os.environ.get("client_secret_id")

@api_view(['GET'])
def login_direct(request):
    SITE = f'https://channeli.in/oauth/authorise/?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&state="Success/'
    return redirect(SITE)



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



@api_view(['GET'])
def get_token(request):
   if "sessionid" in request.COOKIES:
      print(request.session.get("is_Member"))
      return render(request,'first/dashboard.html')
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
        request.session['username'] = username
        request.session['name'] = name
        request.session['year'] = year
        request.session['email'] = email
        request.session['enrolment_no'] = enrolment_no
        request.session['is_Member'] = is_Member
        login(request,user)
      except:
         return Response("Not logged in successfully")
   ##      return Response("Not logged in successfully")
    else:
      return Response("Not an IMG member")
    return render(request,'first/dashboard.html')
   except:
      SITE = f'https://channeli.in/oauth/authorise/?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&state="Success/'
      return redirect(SITE)
#
# {'userId': 18355, 
# 'username': '22112047', 
# 'person': {'shortName': '', 
# 'fullName': 'Jasleen Kaur', 
# 'roles': [
# {'role': 'Student', 'activeStatus': 'ActiveStatus.IS_ACTIVE'}, 
# {'role': 'Maintainer', 'activeStatus': 'ActiveStatus.WILL_BE_ACTIVE'}], 
# 'customRoles': [],
#  'displayPicture': None}, 
# 'student': {
# 'startDate': '2022-10-27',
#  'endDate': None, 
# 'enrolmentNumber': '22112047',
#  'branch name': 'B.Tech. (Electrical Engineering)',
#  'branch degree name': 'B.Tech. - Bachelor of Technology', 
# 'currentYear': 2, 
# 'currentSemester': 3, 
# 'branch department name': 'Electrical Engineering Department'
# },
#  'facultyMember': {}, 
# 'biologicalInformation': {'dateOfBirth': '2005-03-24', 'bloodGroup': 'B+', 'sex': 'female', 'gender': 'woman'},
#  'contactInformation': {
# 'emailAddress': 'jasleen_k@ee.iitr.ac.in', 
# 'emailAddressVerified': False, 
# 'instituteWebmailAddress': 'jasleen_k@ee.iitr.ac.in',
#  'primaryPhoneNumber': '9140835381', 
# 'secondaryPhoneNumber': None},
#  'residentialInformation': {'residence name': 'Sarojini bhawan', 'roomNumber': 'S-70'},
#  'socialInformation': {}}#

