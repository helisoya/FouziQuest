package game;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import java.util.HashMap;


import javax.swing.*;

public class GUI implements MouseListener {
	
	MineField field;
	
	GridLayout grid;
	
	JMenuBar menuBar;
	JMenu menu;
    JFrame frame;
    JMenuItem reset;
    JMenuItem setMax;
    JPanel panel;
    
    JLabel bomb;
    
    HashMap<String,JButton> map = new HashMap<String,JButton>();
    
    Boolean end = false;
    
    
    ImageIcon img_case;
    ImageIcon img_empty;
    ImageIcon img_bomb;
    ImageIcon img_flag;
    
    Color[] colors = {
    		Color.BLUE,
    		new Color(89,173,15),
    		Color.RED,
    		new Color(126,13,168),
    		new Color(168,40,13),
    		new Color(76,131,27),
    		Color.BLACK,
    		new Color(138,182,22)	
    };
    
	
	public GUI(MineField _field) {
		field = _field;
		frame = new JFrame("MineSweeper");
		frame.setIconImage(new ImageIcon(this.getClass().getClassLoader().getResource("res/icon.png")).getImage());
		img_case = new ImageIcon(new ImageIcon(this.getClass().getClassLoader().getResource("res/case.png")).getImage().getScaledInstance(45, 45, Image.SCALE_DEFAULT));
		img_empty = new ImageIcon(new ImageIcon(this.getClass().getClassLoader().getResource("res/vide.png")).getImage().getScaledInstance(45, 45, Image.SCALE_DEFAULT));
		img_bomb = new ImageIcon(new ImageIcon(this.getClass().getClassLoader().getResource("res/bombe.png")).getImage().getScaledInstance(45, 45, Image.SCALE_DEFAULT));
		img_flag = new ImageIcon(new ImageIcon(this.getClass().getClassLoader().getResource("res/flag.png")).getImage().getScaledInstance(45, 45, Image.SCALE_DEFAULT));
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setResizable(false);
		grid = new GridLayout(field.sizeOfMineField, field.sizeOfMineField);
		
		menuBar = new JMenuBar();
		menu = new JMenu("Jeu");
		menuBar.add(menu);
		bomb = new JLabel("Bombes :");
		bomb.setForeground(Color.BLUE);
		menuBar.add(bomb);

		reset = new JMenuItem("Reset");
		reset.addMouseListener(this);
		menu.add(reset);
		
		setMax = new JMenuItem("Nb bombe");
		setMax.addMouseListener(this);
		menu.add(setMax);

		
		panel = new JPanel();
	    frame.setContentPane(panel);
	    panel.setLayout(grid);
	    frame.setJMenuBar(menuBar);
	    
	    frame.setVisible(true);


	}
	
	public void ResetGUI() {
		bomb.setText("Bombes :"+String.valueOf(field.bomb));
		panel.removeAll();
		map.clear();
		for(int row = 0; row<field.sizeOfMineField;row++) {
			for(int column = 0;column<field.sizeOfMineField;column++) {
				JButton b = new JButton(" ");
			    b.setFocusPainted(false);
				b.setIcon(img_case);
				b.setHorizontalTextPosition(JButton.CENTER);
				b.setVerticalTextPosition(JButton.CENTER);
				
				//b.setBackground(Color.gray);
				b.setName(String.valueOf(row)+" "+String.valueOf(column));
				map.put(b.getName(), b);
				b.addMouseListener(this);
				panel.add(b);
			}
		}
	}
	
	public void RefreshGUI() {
		bomb.setText("Bombes :"+String.valueOf(field.bomb));
		for(JButton b : map.values()) {
			b.setText(" ");
			b.setIcon(img_case);
		}
	}
	
	public void EditTile(int row,int column) {
		Tile t = field.GetTile(row, column);
		JButton b = map.get(String.valueOf(row)+" "+String.valueOf(column));
		b.setText(" ");
		b.setIcon(img_case);
		if(t.isFlaged) {
			b.setIcon(img_flag);
		}else if (t.CheckTile() && t.checked){
			b.setIcon(img_bomb);
		}else if(t.checked) {
			b.setIcon(img_empty);
			if(t.nearby!=0) {
				b.setForeground(colors[t.nearby-1]);
				b.setText(String.valueOf(t.nearby));
			}
		}
	}
	
	public void SetSizeOfFrame(int newSizeOfField) {
		grid = new GridLayout(newSizeOfField, newSizeOfField);	
		panel.setLayout(grid);
		frame.setSize(newSizeOfField*45,newSizeOfField*45);
	}
	
	
	public void ShowAll() {
		for(int row = 0;row<field.sizeOfMineField;row++) {
			for(int column = 0;column<field.sizeOfMineField;column++) {
				field.GetTile(row, column).checked = true;
				field.GetTile(row, column).isFlaged = false;
				EditTile(row,column);
			}	
		}
	}

	@Override
	public void mouseClicked(MouseEvent e) {
	}

	@Override
	public void mousePressed(MouseEvent e) {

		if(e.getSource()==reset) {
			end = false;
			field.ResetMineField();
			return;
		}
		
		if(e.getSource()==setMax) {
			String String_firstNumber = JOptionPane.showInputDialog("Combien de bombes au maximum ?");
			System.out.print(String_firstNumber);
			if(String_firstNumber != "" && String_firstNumber != null) {
				int max = Integer.parseInt(String_firstNumber);
				if(max < field.sizeOfMineField*field.sizeOfMineField) {
					field.maxBomb = max;
					end = false;
					field.ResetMineField();	
				}

			}
			return;
			
		}

	
		if(end) {
			return;
		}

		String s = e.getComponent().getName();
		int row = Integer.parseInt(s.split(" ")[0]);
		int column = Integer.parseInt(s.split(" ")[1]);
		Tile t = field.GetTile(row, column);

		if(e.getButton()==MouseEvent.BUTTON1 && t.CanClick()) {
			field.CheckTile(row, column);
		}else if(e.getButton()==MouseEvent.BUTTON3 && !t.checked) {
			
			t.isFlaged = !t.isFlaged;
			if(t.isFlaged) {
				field.bomb--;
			}else {
				field.bomb++;
			}
			bomb.setText("Bombes : "+String.valueOf(field.bomb));
			EditTile(row,column);
		}
	}

	@Override
	public void mouseReleased(MouseEvent e) {

	}

	@Override
	public void mouseEntered(MouseEvent e) {

	}

	@Override
	public void mouseExited(MouseEvent e) {
		
	}
	

}








