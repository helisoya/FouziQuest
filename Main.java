package game;

public class Main {

	public static void main(String[] args) {
		MineField field = new MineField();

		
		GUI gui = new GUI(field);
		field.gui = gui;
		
		field.CreateMineField();
		//field.PrintMineField();
		gui.SetSizeOfFrame(field.sizeOfMineField);
	}
}
