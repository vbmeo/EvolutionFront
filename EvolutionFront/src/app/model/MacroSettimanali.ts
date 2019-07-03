

export class MacroSettimanali {
	  public id: number;
	  public data: Date;
	  public calorie_sett : number;
	  public carboidrati_sett: number;
	  public proteine_sett: number;
	  public grassi_sett: number;
	  public alcool_sett: number;
	  
	  
	
	
	constructor( id: number, data : Date,  calorie_sett: number,
			 carboidrati_sett: number,  proteine_sett: number,
			 grassi_sett: number,  alcool_sett: number) {
		
		this.id = id;
		this.data = data;
		this.calorie_sett = calorie_sett;
		this.carboidrati_sett = carboidrati_sett;
		this.proteine_sett = proteine_sett;
		this.grassi_sett = grassi_sett;
		this.alcool_sett = alcool_sett;
	}
	  
}
