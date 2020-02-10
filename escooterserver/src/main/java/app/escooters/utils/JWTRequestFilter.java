package app.escooters.utils;

import app.escooters.rest.exception.UnAuthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.sasl.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.Set;

/**
 * A filter used to check if a secured request has a valid token
 */
@Component
public class JWTRequestFilter extends OncePerRequestFilter {

  @Autowired
  private JWToken jwToken;

  // path prefixes that will be protected by the authentication filter, so for example in order to go to /scooters, there needs to be a JWT
  private static final Set<String> SECURED_PATHS =
    Set.of("/scooters", "/trips", "/users");

  // This method does all the filtering work
  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain)
    throws ServletException, IOException {

    // --- This part does all the filtering work
    try {
      String path = req.getServletPath();

      // OPTIONS requests and non-secured area should pass through without check
      if (HttpMethod.OPTIONS.matches(req.getMethod()) ||
        SECURED_PATHS.stream().noneMatch(path::startsWith)) {
        chain.doFilter(req, res);
        return;
      }

      // --- Pick up the token from the 'Authorization' header and decrypt and check it
      String encodedToken = req.getHeader(HttpHeaders.AUTHORIZATION);

      if(encodedToken == null) {
        throw new UnAuthorizedException("Failed to authorize");
      }

      // Remove the bearer initial string
      encodedToken = encodedToken.replace("Bearer ", "");

      // Get a representation of the token for future usage by decoding the token
      JWTokenInfo token = jwToken.decode(encodedToken);

      // Continues the chain
      chain.doFilter(req, res);
    } catch(AuthenticationException e ) {

      // Aborts the chain
      res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
      return;
    }
  }
}
