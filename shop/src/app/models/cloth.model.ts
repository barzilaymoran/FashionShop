export class Cloth {
    public id: string;
    public provider: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public color: string;
    public numberOfViews: number; //additional

    constructor(id:string, provider:string, description: string, imagePath: string, price: number, color: string, numberOfViews: number) {
        this.id = id;
        this.provider = provider;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
        this.color = color;
        this.numberOfViews = numberOfViews; //additional
    }
}
