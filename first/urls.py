from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from . import views

router=routers.SimpleRouter()
router.register(r'users',views.UserViewSet)
router.register(r'projects',views.ProjectViewSet)
router.register(r'lists',views.ListViewSet)
router.register(r'cards',views.CardViewSet)
router.register(r'comments',views.CommentViewSet)
router.register(r'card_sub',views.CardSubtaskViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('',views.check_login),
    path('login',views.login_direct),
    path("check_login",views.check_login),
    path('get_token/',views.get_token),
    path('login_password',views.login_password),
    path('logout',views.logout_pass),
    path('loggedIn_projects/',views.ProjectViewSet.as_view({"get":"project_loggedIn_user"},name="project_loggedIn_user")),
    path('loggedIn_cards/',views.CardSubtaskViewSet.as_view({"get":"card_tasks_loggedIn"},name="card_loggedIn_user")),
    path('projects/<int:pk>/add_member',views.ProjectViewSet.as_view({'post':"add_member"}),name='project_add_member'),
    path('projects/<int:pk>/remove_member',views.ProjectViewSet.as_view({'post':"remove_member"}),name='project_remove_member'),
    path('card_sub/<int:pk>/update_assignee/',views.ProjectViewSet.as_view({'post':"update_assignee"}),name='update_assignee'),
    path('cards/<int:card_id>/comments/',views.room,name="card_id"),
    path("lists/pid/<int:pid>",views.ListViewSet.as_view({"get":"getlist_by_pid"}),name="list_by_pid"),
    path('projects/get_members/<int:pk>',views.ProjectViewSet.as_view({"get":"get_members"},name="get_members")),
    path('projects/get_non_members/<int:pk>',views.ProjectViewSet.as_view({"get":"get_non_members"},name="get_non_members")),
    path("cards/dash_cards",views.CardViewSet.as_view({"get":"dash_cards"},name="dash_cards")),
    path("lists/search",views.ListViewSet.as_view({"get":"search_lists"},name="search_lists")),
    # path('search/<int:pid>',)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#project_loggedIn_user
#card_tasks_loggedIn