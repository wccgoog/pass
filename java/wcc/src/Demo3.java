public class Demo3 {
    public static void main(String[] args) {
        Demo1 d = new Demo1();
        d.demo();
        Object[] s = new Object[9];
        for (int i = 0; i < s.length; i++) {
            int n = (int) (Math.random() * 2);
            System.out.println(n);
            switch (n) {
                case 0:
                    s[i] = new Demo1();
                case 1:
                    s[i] = new Demo2();
                default:
                    s[i] = new Object();
            }

        }
    }
}
