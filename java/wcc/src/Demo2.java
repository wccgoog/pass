public class Demo2 {
  int age;
  String name;

  public Demo2() {}

  void demo() {
    System.out.println("demo2");
  }

  public Demo2(String name, int age) {
    this.name = name;
    this.age = age;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == null) {
      return false;
    }
    if (this == obj) {
      return true;
    }
    if (this.getClass() != obj.getClass()) {
      return false;
    }
    Demo2 demo2 = (Demo2) obj;
    return this.name.equals(demo2.name) && this.age == demo2.age;
  }

  public static void main(String[] args) {}
}
