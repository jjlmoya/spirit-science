export default class TextService {
    constructor() {
        this.font = "30px Arial";
        this.color = "white";
        this.align = "center";
    }

    renderCenterText(text, ctx, width, height) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.align;
        ctx.fillText(
            text,
            width / 2,
            height / 2
        );
    }
}