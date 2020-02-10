package app.escooters.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
public class PreConditionException extends RuntimeException {
  public PreConditionException(String message){
    super(message);
  }


}
