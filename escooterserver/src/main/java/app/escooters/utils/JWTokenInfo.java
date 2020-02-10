package app.escooters.utils;

/**
 * Class with useful information of token
 */
public class JWTokenInfo {

  private String eMail;
  private Long userId;
  private boolean admin;

  public JWTokenInfo(){}

  public JWTokenInfo(String eMail, Long userId, boolean admin){
    this.eMail = eMail;
    this.userId = userId;
    this.admin = admin;
  }

  public Long getUserId() {
    return userId;
  }

  public String getEmail() {
    return eMail;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public void setEmail(String eMail) {
    this.eMail = eMail;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
