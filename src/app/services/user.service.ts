import { filter, catchError, map } from 'rxjs/operators';
import { User } from './../classes/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';


@Injectable()
export class userService
{
    private user: User;
    public host:string = 'https://urbanisme-back.herokuapp.com/';

    constructor(private httpclient: HttpClient){}

    getUsers(): Observable<any>
    {
      return this.httpclient.get(this.host+"/api/user/utilisateurs");
    }

    /**
     *
     * @param element
     */
    getUserById(id: number): Observable<any>
    {
        return this.httpclient.get(this.host+`/api/user/utilisateurs/${id}`);
    }

    /**
	* add user
    * @param element
	*/
	public addUser(element: User): Observable<any>
    {
        return this.httpclient.post(this.host+"/api/user/saveUser",element);
    }

     /**
	* update user
    * @param element
	*/
	public updateUser(element: User): Observable<any>
    {
        return this.httpclient.put(this.host+`/api/user/updateUser/${element.id}`, element);
    }

     /**
	* delete user
    * @param element
	*/
	public deleteUser(element: User): Observable<any>
    {
        return this.httpclient.delete(this.host+`/api/user/deleteUser/${element.id}`);
    }

    /**
     * getter
     */
    getter(): User
    {
        return this.user;
    }

    checkUsernameNotTaken(username: string) {
        return this.httpclient.get(this.host+"/api/user/utilisateur/"+username);
    }
    checkEmailNotTaken(email: string) {
        return this.httpclient.get(this.host+"/api/user/"+email);
    }

}
