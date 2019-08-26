import { userService } from './../services/user.service';
import { AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";

export 	class ValidateEmailNotTaken{
    static createValidator(userService: userService) {
        return (control: AbstractControl) => {
          return userService.checkUsernameNotTaken(control.value).pipe(map(res => {
            return res ? { usernameTaken: true } : null;
          }));
        }
      }
    }