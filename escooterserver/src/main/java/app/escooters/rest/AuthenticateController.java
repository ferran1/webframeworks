package app.escooters.rest;

import app.escooters.entity.User;
import app.escooters.rest.exception.UnAuthorizedException;
import app.escooters.utils.JWToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * This rest controller handles the authentication part
 */
@RestController
@RequestMapping("authenticate")
public class AuthenticateController {

  @Autowired
  private JWToken tokenGenerator;

  // Login mapping
  @PostMapping("/login")
  @ResponseBody
  public ResponseEntity<User> userLogin(@RequestBody ObjectNode loginReqBody){
    JsonNode eMail = loginReqBody.findValue("eMail");
    JsonNode passWord = loginReqBody.findValue("passWord");

    User user = new User(eMail.asText(), passWord.asText(), false);

    String subString = User.getSubstring(eMail.asText(), "@");

    if (subString.equals(passWord.asText())){
      // Generate a JWT token
      String token = tokenGenerator.encode(user.geteMail(), user.isAdmin());
      // Return a HTTP response with the user in the body
      // and a JWT token in the header
      return ResponseEntity.accepted()
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
        .body(user);
    } else {
      // Login failed
      String message = String.format("Invalid username: %s or password: %s", eMail, passWord);
      throw new UnAuthorizedException(message);
    }
  }

}
