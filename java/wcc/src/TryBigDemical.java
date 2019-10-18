import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class TryBigDemical {
  public static void main(String[] args) {
    BigDecimal num = new BigDecimal(100).setScale(2, BigDecimal.ROUND_HALF_UP);
    System.out.println(num.toPlainString() + "%");

    Integer a = 0;
    System.out.println(a);
  }
}
