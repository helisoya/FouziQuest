package game;

public class Tile {
	
	
	private int content; // 0 = VIDE ; 1 = BOMBE
	public Boolean checked;
	public Boolean isFlaged;
	public int nearby = 0;
	
	public Tile(int _content) {
		content = _content;
		checked = false;
		isFlaged = false;
	}
	
	public void SetContent(int _new) {
		content = _new;
	}
	
	public int GetContent() {
		return content;
	}
	
	public void Reset() {
		checked = false;
		isFlaged = false;
	}
	
	public Boolean CanClick() {
		return isFlaged == false && checked == false;
	}
	
	public Boolean CheckTile() {
		return content == 1;
	}

}
