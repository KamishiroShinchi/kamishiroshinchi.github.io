import { CanvasTool } from "../entity/CanvasTool"

// 技能
export class Skill {
    name: string
    text: string
    isBold = false
    isItalic = false
    constructor(name: string, text: string) {
        this.name = name
        this.text = text
    }
}

// 插画
class Illastration {
    img: HTMLImageElement
    width: number = 0
    height: number = 0
    isLoad: boolean = false

    constructor() {
        this.img = new Image();
    }

    // 导入插画
    import(url: string, cvt: CanvasTool, card: Card) {
        this.img.src = url
        this.img.onload = () => {
            this.isLoad = true

            let w = cvt.logicSize.x
            let h = w * (this.img.height / this.img.width)
            if (h < cvt.logicSize.y) {
                h = cvt.logicSize.y
                w = h * (this.img.width / this.img.height)
            }

            this.width = w
            this.height = h
            card.w = w
            card.h = h
            card.scale = 100
        }
    }
}

// 势力
export const Power: {[key:string]:string} = {
    '魏': 'wei',
    '蜀': 'shu',
    '吴': 'wu',
    '群': 'qun',
    '神': 'shen',
    '晋': 'jin'
}

// 卡牌
export class Card {
    illastration: Illastration = new Illastration() // 插画
    x: number = 0
    y: number = 0
    w: number = 0
    h: number = 0
    scale: number = 100

    isProducer: boolean = false    // 是否绘制制作商
    isIllustrator: boolean = false // 是否绘制插画师
    isCardNum: boolean = false     // 是否绘制编号
    producer: string = ''   // 制作商
    illastrator: string = ''// 插画师
    cardNum: string = ''         // 编号
 
    isTranslate: boolean = true    // 是否自动简繁转换
    title: string = ''      // 称号
    name: string = ''          // 武将名
    
    power: string = Power['群']      // 势力
    isLord: boolean = false        //是否为主公
    heart: number = 4              // 体力值
    isHreatLimit: boolean = false  // 是否绘制体力上限
    heartLimit: number = 4         // 体力上限

    numSkill: number = 0; // 技能数量
    skills: Skill[] = []  // 技能

    constructor() {
        this.numSkill = 1
        this.skills.push(new Skill('', '。'))

    }

    // 添加空白技能
    addSkill() {
        this.skills.push(new Skill('', ''))
    }

    // 移除一个技能，默认为最后一个技能
    rmSkill(i: number=-1) {
        if (i > 0) {
            this.skills.splice(i, 1)
        } else {
            this.skills.splice(this.skills.length - 1, 1)
        }
        
    }

    // 导入插画
    importIllastration(url: string, cvt: CanvasTool) {
        this.illastration.import(url, cvt, this)
    }
}