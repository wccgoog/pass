package src;

public class Demo1 {

	public static void main(String[] args) {
		Demo2 d1 = new Demo2("wcc", 18);
		Demo2 d2 = new Demo2("wcc", 18);
		System.out.println(d1.equals(d2));
	}

	void demo() {
		System.out.println("demo1");
	}
}
