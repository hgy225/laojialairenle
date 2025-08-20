// 山峰等级定义
const MOUNTAIN_LEVELS = [
    {
        id: 1,
        name: "初级山峰",
        minHeight: 0,
        maxHeight: 1000,
        order: 1,
        description: "适合初学者的低海拔山峰，风险较低",
        color: "success"
    },
    {
        id: 2,
        name: "中级山峰",
        minHeight: 1000,
        maxHeight: 2000,
        order: 2,
        description: "有一定挑战性的山峰，需要基本登山技能",
        color: "info"
    },
    {
        id: 3,
        name: "中高级山峰",
        minHeight: 2000,
        maxHeight: 3000,
        order: 3,
        description: "挑战性较强的山峰，需要一定经验",
        color: "primary"
    },
    {
        id: 4,
        name: "高级山峰",
        minHeight: 3000,
        maxHeight: 4000,
        order: 4,
        description: "高海拔山峰，需要专业装备和技能",
        color: "warning"
    },
    {
        id: 5,
        name: "专家级山峰",
        minHeight: 4000,
        maxHeight: 5000,
        order: 5,
        description: "仅供专家攀登的山峰，风险极高",
        color: "orange"
    },
    {
        id: 6,
        name: "极限山峰",
        minHeight: 5000,
        maxHeight: 6000,
        order: 6,
        description: "极限挑战山峰，需要极强体能",
        color: "dark"
    },
    {
        id: 7,
        name: "极高山峰",
        minHeight: 6000,
        maxHeight: 8000,
        order: 7,
        description: "极高海拔山峰，氧气稀薄",
        color: "secondary"
    },
    {
        id: 8,
        name: "世界最高峰",
        minHeight: 8000,
        maxHeight: 9000,
        order: 8,
        description: "世界最高峰，登山者的终极挑战",
        color: "danger"
    }
];

// 山峰数据
const MOUNTAINS = [
    {
        id: 1,
        name: "泰山",
        height: 1545,
        levelId: 1,
        story: "五岳之首，位于山东省泰安市，是世界文化与自然双重遗产，有“天下第一山”之称。泰山被古人视为“直通帝座”的天堂，成为百姓崇拜，帝王告祭的神山。",
        imageUrl: "images/mountains/taishan.jpeg",
        difficulty: 1,
        sceneries: [
            "images/scenery/taishan_1.jpg",
            "images/scenery/taishan_2.jpg",
            "images/scenery/taishan_3.jpg"
        ]
    },
    {
        id: 2,
        name: "华山",
        height: 2155,
        levelId: 2,
        story: "五岳之一，位于陕西省渭南市华阴市，以险峻著称，有“奇险天下第一山”之称。华山是中华民族的圣山，中华之“华”，源于华山，由此，华山有了“华夏之根”之称。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 3,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    },
    {
        id: 3,
        name: "黄山",
        height: 1864,
        levelId: 2,
        story: "位于安徽省黄山市，以奇松、怪石、云海、温泉四绝著称，有“天下第一奇山”之称。黄山原名黟山，因峰岩青黑，遥望苍黛而名。后因传说轩辕黄帝曾在此炼丹，唐天宝六年（747年）改名为黄山。",
        imageUrl: "images/mountains/huangshan.jpeg",
        difficulty: 2,
        sceneries: [
            "images/scenery/huangshan_1.jpeg",
            "images/scenery/huangshan_2.jpeg",
            "images/scenery/huangshan_3.jpeg"
        ]
    },
    {
        id: 4,
        name: "峨眉山",
        height: 3099,
        levelId: 3,
        story: "位于四川省乐山市峨眉山市境内，是中国四大佛教名山之一，普贤菩萨的道场。地势陡峭，风景秀丽，素有“峨眉天下秀”之称。山上的万佛顶最高，海拔3099米，高出峨眉平原2700多米。",
        imageUrl: "images/mountains/emeishan.jpeg",
        difficulty: 3,
        sceneries: [
            "images/scenery/emeishan_1.jpeg",
            "images/scenery/emeishan_2.jpeg",
            "images/scenery/emeishan_3.jpeg"
        ]
    },
    {
        id: 5,
        name: "雀儿山",
        height: 3667,
        levelId: 4,
        story: "位于四川省甘孜藏族自治州德格县境内，是横断山脉沙鲁里山的主峰，有'川藏第一峰'之称。山峰北侧有著名的雀儿山冰川，是登山和科考的理想场所。",
        imageUrl: "images/mountains/queershan.jpeg",
        difficulty: 4,
        sceneries: [
            "images/scenery/queershan_1.jpeg",
            "images/scenery/queershan_2.jpeg",
            "images/scenery/queershan_3.jpeg"
        ]
    },
    {
        id: 6,
        name: "格聂山",
        height: 3941,
        levelId: 4,
        story: "位于四川省甘孜州理塘县境内，是康巴地区的第一高峰，藏语意为'雪之女王'。格聂山地区生态系统完整，是珍稀动植物的栖息地。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 4,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    },
    {
        id: 7,
        name: "南迦巴瓦峰",
        height: 4587,
        levelId: 5,
        story: "位于西藏林芝地区，是7000米级山峰中最低的山峰，但攀登难度极大，被评为世界上最难攀登的山峰之一。藏语意为'雷电如火燃烧'。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 5,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    },
    {
        id: 8,
        name: "阿尼玛卿峰",
        height: 4812,
        levelId: 5,
        story: "位于青海省果洛藏族自治州玛沁县西北部，是黄河源头最大的山峰。藏语意为'祖父大玛卿'，是藏族人民心目中的神山。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 4,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    }, 
    {
        id: 9,
        name: "慕士塔格峰",
        height: 5809,
        levelId: 6,
        story: "位于新疆维吾尔自治区阿克陶县与塔什库尔干县交界处，是昆仑山脉的著名高峰，有'冰山之父'的美称。山峰呈穹窿状，远望如银色巨塔矗立。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 4,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    },
    {
        id: 10,
        name: "公格尔峰",
        height: 5688,
        levelId: 6,
        story: "位于新疆克孜勒苏柯尔克孜自治州阿克陶县，是昆仑山脉的著名山峰之一。在维吾尔语中意为'绿色的山'，是该地区的重要地标。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 4,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    },
    {
        id: 11,
        name: "贡嘎山",
        height: 7556,
        levelId: 7,
        story: "位于四川省甘孜藏族自治州康定市，是横断山脉的第一高峰，也是四川省的最高峰，被称为“蜀山之王”。藏语意为“白色的雪峰”，是国际上享有盛名的高山探险和登山圣地。",
        imageUrl: "images/mountains/huashan.jpeg",
        difficulty: 4,
        sceneries: [
            "images/scenery/huashan_1.jpg",
            "images/scenery/huashan_2.png",
            "images/scenery/huashan_3.jpeg"
        ]
    },
    {
        id: 12,
        name: "珠穆朗玛峰",
        height: 8849,
        levelId: 8,
        story: "世界最高峰，位于中国和尼泊尔边境，藏语意为“大地之母”，是登山者的终极挑战。1953年5月29日，新西兰登山家埃德蒙·希拉里和尼泊尔夏尔巴人丹增·诺盖首次登顶成功。",
        imageUrl: "images/mountains/zhumulangma.jpeg",
        difficulty: 5,
        sceneries: [
            "images/scenery/zhumulangma_1.jpeg",
            "images/scenery/zhumulangma_2.jpeg",
            "images/scenery/zhumulangma_3.jpeg"
        ]
    }
];

// 野生动物数据
const WILDLIFE = [
    {
        id: 1,
        name: "野狼",
        levelId: 1,
        health: 30,
        attackPower: 10,
        imageUrl: "images/wildlife/wolf.jpg",
        experienceReward: 5
    },
    {
        id: 2,
        name: "雪豹",
        levelId: 7,
        health: 50,
        attackPower: 15,
        imageUrl: "images/wildlife/snow-leopard.jpg",
        experienceReward: 20
    },
    {
        id: 3,
        name: "棕熊",
        levelId: 3,
        health: 40,
        attackPower: 12,
        imageUrl: "images/wildlife/bear.jpg",
        experienceReward: 10
    },
    {
        id: 4,
        name: "雪怪",
        levelId: 8,
        health: 70,
        attackPower: 20,
        imageUrl: "images/wildlife/yeti.jpg",
        experienceReward: 30
    }
];

// 知识问答数据
const QUIZ_QUESTIONS = [
    {
        mountainId: 1,
        question: "泰山位于哪个省份？",
        optionA: "山东省",
        optionB: "陕西省",
        optionC: "安徽省",
        optionD: "河南省",
        correctAnswer: "A",
        points: 10
    },
    {
        mountainId: 1,
        question: "泰山被称为什么？",
        optionA: "奇险天下第一山",
        optionB: "天下第一奇山",
        optionC: "天下第一山",
        optionD: "蜀山之王",
        correctAnswer: "C",
        points: 10
    },
    {
        mountainId: 2,
        question: "华山以什么著称？",
        optionA: "奇松、怪石、云海、温泉",
        optionB: "奇险天下第一山",
        optionC: "天下第一山",
        optionD: "峨眉天下秀",
        correctAnswer: "B",
        points: 10
    },
    {
        mountainId: 3,
        question: "黄山原名什么？",
        optionA: "泰山",
        optionB: "黟山",
        optionC: "华山",
        optionD: "峨眉山",
        correctAnswer: "B",
        points: 10
    },
    {
        mountainId: 4,
        question: "峨眉山是什么菩萨的道场？",
        optionA: "文殊菩萨",
        optionB: "观音菩萨",
        optionC: "普贤菩萨",
        optionD: "地藏菩萨",
        correctAnswer: "C",
        points: 10
    },
    {
        mountainId: 5,
        question: "雀儿山位于哪个省份？",
        optionA: "青海省",
        optionB: "西藏自治区",
        optionC: "四川省",
        optionD: "新疆维吾尔自治区",
        correctAnswer: "C",
        points: 10
    },
    {
        mountainId: 5,
        question: "雀儿山有什么称号？",
        optionA: "蜀山之王",
        optionB: "雪之女王",
        optionC: "冰山之父",
        optionD: "川藏第一峰",
        correctAnswer: "D",
        points: 10
    },
    {
        mountainId: 6,
        question: "格聂山位于哪个自治州？",
        optionA: "阿坝藏族羌族自治州",
        optionB: "甘孜藏族自治州",
        optionC: "凉山彝族自治州",
        optionD: "德宏傣族景颇族自治州",
        correctAnswer: "B",
        points: 10
    },
    {
        mountainId: 7,
        question: "南迦巴瓦峰位于哪个地区？",
        optionA: "西藏林芝",
        optionB: "青海果洛",
        optionC: "新疆阿克陶",
        optionD: "四川康定",
        correctAnswer: "A",
        points: 15
    },
    {
        mountainId: 7,
        question: "南迦巴瓦峰的攀登难度如何？",
        optionA: "非常简单",
        optionB: "一般",
        optionC: "较难",
        optionD: "世界上最难攀登的山峰之一",
        correctAnswer: "D",
        points: 15
    },
    {
        mountainId: 8,
        question: "阿尼玛卿峰位于哪个省份？",
        optionA: "西藏自治区",
        optionB: "新疆维吾尔自治区",
        optionC: "青海省",
        optionD: "四川省",
        correctAnswer: "C",
        points: 15
    },
    {
        mountainId: 8,
        question: "阿尼玛卿峰是哪条河流源头的最高峰？",
        optionA: "长江",
        optionB: "黄河",
        optionC: "澜沧江",
        optionD: "怒江",
        correctAnswer: "B",
        points: 15
    },
    {
        mountainId: 9,
        question: "慕士塔格峰被称为什么？",
        optionA: "世界之巅",
        optionB: "蜀山之王",
        optionC: "冰山之父",
        optionD: "绿色的山",
        correctAnswer: "C",
        points: 15
    },
    {
        mountainId: 9,
        question: "慕士塔格峰位于哪两个县的交界处？",
        optionA: "德格县与康定市",
        optionB: "阿克陶县与塔什库尔干县",
        optionC: "理塘县与德格县",
        optionD: "玛沁县与康定市",
        correctAnswer: "B",
        points: 15
    },
    {
        mountainId: 10,
        question: "公格尔峰在维吾尔语中是什么意思？",
        optionA: "雪之女王",
        optionB: "冰山之父",
        optionC: "绿色的山",
        optionD: "雷电如火燃烧",
        correctAnswer: "C",
        points: 15
    },
    {
        mountainId: 11,
        question: "贡嘎山位于哪个自治州？",
        optionA: "阿坝藏族羌族自治州",
        optionB: "甘孜藏族自治州",
        optionC: "凉山彝族自治州",
        optionD: "迪庆藏族自治州",
        correctAnswer: "B",
        points: 20
    },
    {
        mountainId: 11,
        question: "贡嘎山被称为？",
        optionA: "川藏第一峰",
        optionB: "雪之女王",
        optionC: "蜀山之王",
        optionD: "世界之巅",
        correctAnswer: "C",
        points: 20
    },
    {
        mountainId: 12,
        question: "珠穆朗玛峰的海拔高度是多少？",
        optionA: "8848米",
        optionB: "8849米",
        optionC: "8850米",
        optionD: "8847米",
        correctAnswer: "B",
        points: 20
    },
    {
        mountainId: 12,
        question: "谁是首次登顶珠峰的人？",
        optionA: "莱因霍尔德·梅斯纳尔",
        optionB: "埃德蒙·希拉里和丹增·诺盖",
        optionC: "田部井淳子",
        optionD: "克里斯·波宁顿",
        correctAnswer: "B",
        points: 20
    }
];