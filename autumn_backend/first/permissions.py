from rest_framework import permissions
from .models import User,Project

class IsProjectMember_or_Admin(permissions.BasePermission):
    # Allow read-only access to all users
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
           return True
        current_user=User.objects.get(username=(request.session.get("username")))
        cond1=current_user.is_superuser
        project_id = view.kwargs.get('pk')
        if project_id is not None:
            try:
                project = Project.objects.get(pk=project_id)
                return current_user in project.project_members.all()
            except Project.DoesNotExist:
                return False
        return False


    