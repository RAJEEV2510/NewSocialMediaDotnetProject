import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from 'src/app/modals/roles-modals/roles-modals.component';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: any;
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users) => {
      this.users = users;
    })
  }

  EditRoles(user) {
    const initialState: ModalOptions = {
      initialState: {
        user,
        roles: this.getRolesArray(user.roles),
        title: 'Edit Roles'
      }
    };

    this.bsModalRef = this.modalService.show(RolesModalsComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      var roles = [...values.filter(el => el.checked == true).map(el => el.name)]
      if (roles) {
        this.adminService.updateUserRoles(user.userName, roles).subscribe(() => {
          user.roles = roles
        })
      }
    })
  }

  getRolesArray(userroles) {
    const roles = [];
    const userRoles = userroles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Member', value: 'Member' },

    ]

    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (userRole == role.name) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role)

      }

    })
    console.log(roles)
    return roles
  }

}
