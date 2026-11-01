import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = localStorage.getItem('auth');

  if (!auth) {
    return next(req);
  }

  try {
    const session = JSON.parse(auth);

    const headers: Record<string, string> = {};

    if (session.AccessToken) {
      headers['Authorization'] = `Bearer ${session.AccessToken}`;
    }

    if (session._id) {
      headers['user'] = session._id;
    }

    return next(req.clone({ setHeaders: headers }));
  } catch {
    return next(req);
  }
};
