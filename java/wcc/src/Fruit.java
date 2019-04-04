
public class Fruit {
	public void showName(int number) {
		System.out.println("Fruit:" + number);
	}

	public static void main(String[] args) {
		Fruit apple = new Apple();
		apple.showName(2);
	}

}
