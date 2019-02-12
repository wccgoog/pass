public class Apple extends Fruit {
	@Override
	public void showName(int number) {
		String str = "a,b,c,,";
		String arr[] = str.split(",", 2);
//		List<String> list = new ArrayList<>();
//		list.add("1");
//		list.add("2");
		for (String i : arr) {
			System.out.println(i);
		}
//		Iterator<String> iterator = list.iterator();
//		while (iterator.hasNext()) {
//			String item = iterator.next();
//			System.out.println(item);
//			iterator.remove();
//		}
//		System.out.println(list.toString());
//		for (String item : list) {
//			if ("2".equals(item)) {
//				list.remove(item);
//			}
//		}
//		System.out.println(list.toString());
	}
}
