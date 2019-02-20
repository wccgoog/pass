
public class FactorialThreadTest {

	public static void main(String[] args) {
		System.out.println("main thread starts");

		for (int i = 1; i < 6; i++) {
			new Thread(new FactorialThread(i)).start();
			new Thread(new FactorialThread(i)).start();
		}
		System.out.println("main thread ends");
	}
}
