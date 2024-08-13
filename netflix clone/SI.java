import java.util.Scanner;

public class SI {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Principle: ");
        int p = sc.nextInt();
        System.out.println("Enter Rate: ");
        int r = sc.nextInt();
        System.out.println("Enter Time: ");
        int t = sc.nextInt();
        System.out.println("Simple Interest : " + (p * r * t / 100));

        sc.close();
    }
}