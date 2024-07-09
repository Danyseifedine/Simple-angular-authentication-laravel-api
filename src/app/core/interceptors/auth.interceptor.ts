import { Injectable } from '@angular/core'; // Decorator that marks a class as injectable
import {
  HttpRequest, // Class that represents an outgoing HTTP request
  HttpHandler, // Class that processes an outgoing HTTP request
  HttpInterceptor, // Interface that classes can implement to intercept outgoing HTTP requests
  HttpErrorResponse // Class that represents an HTTP error response
} from '@angular/common/http'; // Module that provides a way to send HTTP requests and intercept responses
import { throwError } from 'rxjs'; // Module that provides a way to represent and manipulate streams of data
import { catchError } from 'rxjs/operators'; // Module that provides a way to handle errors in a stream of data
import { Router } from '@angular/router'; // Module that provides a way to handle client-side routing

/**
 * Class that implements the HttpInterceptor interface
 * and is responsible for intercepting outgoing HTTP requests
 * and adding an authorization header if the user is authenticated
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor that takes a Router as a parameter
   * @param router The Router service that will be used to navigate to the login page
   */
  constructor(private router: Router) { }

  /**
   * Method that is called by the Angular framework to intercept an outgoing HTTP request
   * @param request The outgoing HTTP request
   * @param next The next interceptor in the chain or the server if there are no more interceptors
   * @returns An Observable that represents the modified request or the original request
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    /**
     * Get the authentication token from local storage
     * If the token is not present, do not modify the request and return it
     */
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return next.handle(request);
    }

    /**
     * Clone the request and add the authorization header to the cloned request
     * The authorization header contains the token
     */
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    /**
     * Call the next interceptor in the chain or the server with the modified request
     * If the response is an error (status code 401), navigate to the login page
     * If the response is not an error, return the original response
     */
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}

