package app.escooters.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

  @Id
  private Long id;

  private String eMail;
  private String name;
  private String hashedPassWord;
  private boolean admin;

  protected User(){
  }

  public User(String eMail, String hashedPassWord, boolean admin){
    this.id = (long) randDouble(1, 100000); // Get a random id between 1 and 100000
    this.eMail = eMail;
    this.name = getSubstring(eMail, "@");
    this.hashedPassWord = hashedPassWord;
    this.admin = admin;
  }

  /**
   * Returns the substring before a given character
   * @param
   * @return the substring
   */
  public static String getSubstring(String eMail, String character){
    int charInd = eMail.indexOf(character); // Finds the index of the given character in the String
    String subString = "";
    if (charInd != -1){
      subString = eMail.substring(0 , charInd); // Create substring until character @
    }
    return subString;
  }

  /**
   * Method to get a random number between 2 ranges
   * @param bound1
   * @param bound2
   * @return
   */
  public static double randDouble(double bound1, double bound2) {
    //make sure bound2> bound1
    double min = Math.min(bound1, bound2);
    double max = Math.max(bound1, bound2);
    //math.random gives random number from 0 to 1
    return min + (Math.random() * (max - min));
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String geteMail() {
    return eMail;
  }

  public void seteMail(String eMail) {
    this.eMail = eMail;
  }

  public String getHashedPassWord() {
    return hashedPassWord;
  }

  public void setHashedPassWord(String hashedPassWord) {
    this.hashedPassWord = hashedPassWord;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", eMail='" + eMail + '\'' +
      ", name='" + name + '\'' +
      ", hashedPassWord='" + hashedPassWord + '\'' +
      ", admin=" + admin +
      '}';
  }
}
