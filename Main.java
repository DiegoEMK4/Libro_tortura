import javax.swing.*;
import java.awt.*;
import java.util.Scanner;

class Interfaz extends JPanel {
    private int ancho;
    private int alto;
    private int x;
    private int y;

    public Interfaz(int ancho, int alto, int x, int y) {
        this.ancho = ancho;
        this.alto = alto;
        this.x = x;
        this.y = y;
        setPreferredSize(new Dimension(ancho, alto));
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.BLACK);
        g.fillRect(x, y, 5, 5); // Dibuja un cuadrado de 5x5 para representar el punto
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingresa el ancho de la interfaz: ");
        int ancho = scanner.nextInt();

        System.out.print("Ingresa el alto de la interfaz: ");
        int alto = scanner.nextInt();

        System.out.print("Ingresa la coordenada x: ");
        int x = scanner.nextInt();

        System.out.print("Ingresa la coordenada y: ");
        int y = scanner.nextInt();

        JFrame frame = new JFrame("Dibujar Punto");
        Interfaz interfaz = new Interfaz(ancho, alto, x, y);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(interfaz);
        frame.pack();
        frame.setLocationRelativeTo(null); // Centra la ventana en la pantalla
        frame.setVisible(true);
    }
}
