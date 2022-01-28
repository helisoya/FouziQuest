package game;

import java.util.Random;
import java.util.Vector;

import javax.swing.JOptionPane;

public class MineField {
	public GUI gui;
	public int sizeOfMineField = 10;
	public int Remaining = 0;
	Vector<Vector<Tile>> mineField = new Vector<Vector<Tile>>();
	
	public int bomb = 0;
	
	public int maxBomb = 20;
	
	public void CreateMineField() {
		mineField.clear();
		Remaining = 0;
		bomb = 0;
		for(int row = 0; row<sizeOfMineField;row++) {
			mineField.add(new Vector<Tile>());
			for(int column = 0; column<sizeOfMineField;column++) {

				mineField.get(row).add(new Tile(0));
			}
		}
		//CheckNearbyForTiles();
		gui.ResetGUI();
		ResetMineField();
	}
	
	public void ResetMineField() {
		Remaining = sizeOfMineField*sizeOfMineField - maxBomb;
		bomb = 0;
		for(int row = 0; row<sizeOfMineField;row++) {
			for(int column = 0; column<sizeOfMineField;column++) {
				mineField.get(row).get(column).Reset();
				mineField.get(row).get(column).SetContent(0);
			}
		}
		Random rand = new Random();
		int xpos = 0;
		int ypos = 0;
		while(bomb < maxBomb) {
			xpos = rand.nextInt(sizeOfMineField);
			ypos = rand.nextInt(sizeOfMineField);
			if(GetTile(xpos,ypos).GetContent() != 1) {
				GetTile(xpos,ypos).SetContent(1);
				bomb++;
			}
		}
		CheckNearbyForTiles();
		gui.RefreshGUI();
	}
	
	public void PrintMineField() {
		String aff = "";
		for(int row = 0; row<sizeOfMineField; row++) {
			aff = "";
			for(int column = 0; column<sizeOfMineField; column++) {
				aff += mineField.get(row).get(column).GetContent() + ",";
			}
			System.out.print(aff+"\n");
		}
	}
	
	Tile GetTile(int row,int column) {
		return mineField.get(row).get(column);
	}
	
	public void CheckTile(int _row, int _column) {
		Tile t = GetTile(_row,_column);
		t.checked = true;
		gui.EditTile(_row, _column);
		if(t.CheckTile()) {
			gui.end = true;
			gui.ShowAll();
			JOptionPane.showMessageDialog(gui.frame, "PERDU !");
		}else{ 
			Remaining--;
			
			
			if(t.nearby == 0) {
				
				if(_row > 0) {
					if(GetTile(_row-1,_column).CanClick()) {
						CheckTile(_row-1,_column);
					}
				}if(_row < sizeOfMineField-1) {
					if(GetTile(_row+1,_column).CanClick()) {
						CheckTile(_row+1,_column);
					}
				}
				if(_column > 0) {
					if(GetTile(_row,_column-1).CanClick()) {
						CheckTile(_row,_column-1);
					}
				}
				if(_column < sizeOfMineField-1) {
					if(GetTile(_row,_column+1).CanClick()) {
						CheckTile(_row,_column+1);
					}
				}if(_row > 0 && _column > 0) {
					if(GetTile(_row-1,_column-1).CanClick()) {
						CheckTile(_row-1,_column-1);
					}
				}if(_row < sizeOfMineField-1 && _column > 0) { 
					if(GetTile(_row+1,_column-1).CanClick()) {
						CheckTile(_row+1,_column-1);
					}
				}if(_row > 0 && _column < sizeOfMineField-1) { 
					if(GetTile(_row-1,_column+1).CanClick()) {
						CheckTile(_row-1,_column+1);
					}
				}if(_row < sizeOfMineField-1 && _column < sizeOfMineField-1) { 
					if(GetTile(_row+1,_column+1).CanClick()) {
						CheckTile(_row+1,_column+1);
					}
				}
			}
			
			if(Remaining == 0 && gui.end==false) {
				gui.end = true;
				gui.ShowAll();
				JOptionPane.showMessageDialog(gui.frame, "Bravo, vous avez gagné !");
			}
		}
	}
	
	void CheckNearbyForTiles() {
		for(int _row = 0; _row<sizeOfMineField; _row++) {
			for(int _column = 0; _column<sizeOfMineField; _column++) {
				int nearby = 0;
				if(_row > 0) { 
					if(GetTile(_row-1,_column).CheckTile()) {
						nearby++;
					}
				} 
				if(_row < sizeOfMineField-1) {
					if(GetTile(_row+1,_column).CheckTile()) {
						nearby++;
					}
				} 
				if(_column > 0) {
					if(GetTile(_row,_column-1).CheckTile()) {
						nearby++;
					}
				} 
				if(_column < sizeOfMineField-1) {
					if(GetTile(_row,_column+1).CheckTile()) {
						nearby++;
					}
				}if(_row > 0 && _column > 0) {
					if(GetTile(_row-1,_column-1).CheckTile()) {
						nearby++;
					}
				}if(_row < sizeOfMineField-1 && _column > 0) {
					if(GetTile(_row+1,_column-1).CheckTile()) {
						nearby++;
					}
				}if(_row > 0 && _column < sizeOfMineField-1) {
					if(GetTile(_row-1,_column+1).CheckTile()) {
						nearby++;
					}
				}if(_row < sizeOfMineField-1 && _column < sizeOfMineField-1) { 
					if(GetTile(_row+1,_column+1).CheckTile()) {
						nearby++;
					}
				}
				GetTile(_row,_column).nearby = nearby;
			}
		}
	}
	
}
