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


urlpatterns = [
    path('',include(router.urls)),
    path('',views.check_login),
    path('login',views.login_direct),
    path('get_token/',views.get_token),
    path('login_password',views.login_password),
    path('logout',views.logout_pass),
    path('projects/<int:pk>/add_member',views.ProjectViewSet.as_view({'post':"add_member"}),name='project_add_member'),
    path('cards/<int:card_id>/comments/',views.room,name="card_id")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

