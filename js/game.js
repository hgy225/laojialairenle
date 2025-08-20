// 游戏状态
let gameState = {
    player: {
        level: 1,
        experience: 0,
        energy: 100,
        maxEnergy: 100,
        failures: [0, 0, 0, 0, 0, 0, 0, 0], // 每个等级的失败次数
        inventory: {
            food: 3,
            water: 2
        }
    },
    currentMountain: null,
    progress: 0,
    isInCombat: false,
    currentEnemy: null,
    combatState: {
        playerHealth: 100,
        enemyHealth: 0
    },
    timeStarted: null,
    timeElapsed: 0,
    timerInterval: null
};

// 初始化游戏
function initGame() {
    loadGameState();
    updateUI();
    startTimer();
}

// 开始计时器
function startTimer() {
    gameState.timeStarted = new Date();
    gameState.timerInterval = setInterval(() => {
        const now = new Date();
        gameState.timeElapsed = Math.floor((now - gameState.timeStarted) / 1000);
        updateTimerDisplay();
    }, 1000);
}

// 更新计时器显示
function updateTimerDisplay() {
    const minutes = Math.floor(gameState.timeElapsed / 60).toString().padStart(2, '0');
    const seconds = (gameState.timeElapsed % 60).toString().padStart(2, '0');
    document.getElementById('gameTimer').textContent = `${minutes}:${seconds}`;
}

// 保存游戏状态
function saveGameState() {
    localStorage.setItem('mountainClimbingGame', JSON.stringify(gameState));
}

// 加载游戏状态
function loadGameState() {
    const savedState = localStorage.getItem('mountainClimbingGame');
    if (savedState) {
        gameState = JSON.parse(savedState);
    }
}

// 显示等级选择
function showLevelSelection() {
    const accordion = document.getElementById('levelsAccordion');
    accordion.innerHTML = '';
    
    MOUNTAIN_LEVELS.forEach((level, index) => {
        const isUnlocked = level.order <= gameState.player.level;
        const mountainsInLevel = MOUNTAINS.filter(m => m.levelId === level.id);
        
        let mountainsHtml = '';
        if (mountainsInLevel.length > 0) {
            mountainsHtml = '<div class="row">';
            mountainsInLevel.forEach(mountain => {
                mountainsHtml += `
                    <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card mountain-card ${isUnlocked ? '' : 'disabled'}" 
                             onclick="${isUnlocked ? `selectMountain(${mountain.id})` : ''}">
                            <img src="${mountain.imageUrl}" class="card-img-top" 
                                 style="height: 120px; object-fit: cover;" 
                                 alt="${mountain.name}">
                            <div class="card-body p-2">
                                <h6 class="card-title mb-1">${mountain.name}</h6>
                                <p class="card-text small mb-1">${mountain.height}米</p>
                                <p class="card-text small text-muted mb-0">
                                    ${'★'.repeat(mountain.difficulty)}${'☆'.repeat(5 - mountain.difficulty)}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
            mountainsHtml += '</div>';
        } else {
            mountainsHtml = '<p class="text-muted">暂无山峰</p>';
        }
        
        const levelHtml = `
            <div class="card">
                <div class="card-header ${isUnlocked ? '' : 'bg-light'}" id="heading${level.id}">
                    <h2 class="mb-0">
                        <button class="btn btn-link ${isUnlocked ? 'text-primary' : 'text-muted'} btn-block text-left" 
                                type="button" 
                                data-toggle="collapse" 
                                data-target="#collapse${level.id}" 
                                aria-expanded="${index === 0}" 
                                aria-controls="collapse${level.id}"
                                ${isUnlocked ? '' : 'disabled'}>
                            <span class="badge badge-${level.color} mr-2">第${level.order}级</span>
                            ${level.name} (${level.minHeight}-${level.maxHeight}米)
                            ${isUnlocked ? '<i class="fas fa-check-circle text-success ml-2"></i>' : ''}
                        </button>
                    </h2>
                </div>
                <div id="collapse${level.id}" class="collapse ${index === 0 ? 'show' : ''}" 
                     aria-labelledby="heading${level.id}" data-parent="#levelsAccordion">
                    <div class="card-body">
                        <p>${level.description}</p>
                        ${mountainsHtml}
                    </div>
                </div>
            </div>
        `;
        
        accordion.innerHTML += levelHtml;
    });
    
    $('#levelModal').modal('show');
}

// 选择山峰
function selectMountain(mountainId) {
    const mountain = MOUNTAINS.find(m => m.id === mountainId);
    if (!mountain) return;
    
    // 检查是否可以进入这个等级
    const level = MOUNTAIN_LEVELS.find(l => l.id === mountain.levelId);
    if (level.order > gameState.player.level) {
        alert('你必须先完成较低等级的挑战！');
        return;
    }
    
    gameState.currentMountain = mountain;
    gameState.progress = 0;
    gameState.isInCombat = false;
    gameState.currentEnemy = null;
    
    // 初始化玩家生命值
    gameState.combatState.playerHealth = 100;
    
    $('#levelModal').modal('hide');
    updateUI();
    saveGameState();
}

// 继续攀登
function climb() {
    if (!gameState.currentMountain) return;
    
    // 消耗能量
    const energyConsumption = 5 + Math.floor(gameState.currentMountain.difficulty / 2);
    gameState.player.energy = Math.max(0, gameState.player.energy - energyConsumption);
    
    // 增加进度
    const progressIncrease = 5 + Math.floor(Math.random() * 5);
    gameState.progress = Math.min(100, gameState.progress + progressIncrease);
    
    // 随机事件
    const eventChance = Math.random();
    
    // 随机遭遇野生动物
    if (eventChance < 0.2 && !gameState.isInCombat) {
        encounterWildlife();
    }
    // 随机找到能量补给
    else if (eventChance < 0.35) {
        findRandomEnergy();
    }
    // 随机看到美景
    else if (eventChance < 0.5) {
        showScenery();
    }
    
    // 检查能量是否耗尽
    if (gameState.player.energy <= 0) {
        handleEnergyDepletion();
        return;
    }
    
    // 检查是否到达山顶
    if (gameState.progress >= 100) {
        reachSummit();
        return;
    }
    
    updateUI();
    saveGameState();
}

// 遭遇野生动物
function encounterWildlife() {
    const possibleEnemies = WILDLIFE.filter(w => w.levelId <= gameState.currentMountain.levelId);
    if (possibleEnemies.length === 0) return;
    
    const enemy = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
    gameState.currentEnemy = {...enemy};
    gameState.combatState.enemyHealth = enemy.health;
    gameState.isInCombat = true;
    
    updateUI();
}

// 玩家攻击
function playerAttack() {
    if (!gameState.isInCombat || !gameState.currentEnemy) return;
    
    // 计算伤害（带有一些随机性）
    const playerDamage = 15 + Math.floor(Math.random() * 10);
    const enemyDamage = gameState.currentEnemy.attackPower + Math.floor(Math.random() * 5);
    
    // 应用伤害
    gameState.combatState.enemyHealth = Math.max(0, gameState.combatState.enemyHealth - playerDamage);
    
    // 敌人反击
    if (gameState.combatState.enemyHealth > 0) {
        gameState.combatState.playerHealth = Math.max(0, gameState.combatState.playerHealth - enemyDamage);
    }
    
    // 检查战斗结果
    if (gameState.combatState.enemyHealth <= 0) {
        // 玩家胜利
        winCombat();
    } else if (gameState.combatState.playerHealth <= 0) {
        // 玩家失败
        loseCombat();
    }
    
    updateUI();
}

// 玩家防御
function playerDefend() {
    if (!gameState.isInCombat || !gameState.currentEnemy) return;
    
    // 防御减少受到的伤害
    const enemyDamage = Math.max(1, gameState.currentEnemy.attackPower - 5 + Math.floor(Math.random() * 3));
    gameState.combatState.playerHealth = Math.max(0, gameState.combatState.playerHealth - enemyDamage);
    
    // 反击造成较少伤害
    const counterDamage = 5 + Math.floor(Math.random() * 5);
    gameState.combatState.enemyHealth = Math.max(0, gameState.combatState.enemyHealth - counterDamage);
    
    // 检查战斗结果
    if (gameState.combatState.enemyHealth <= 0) {
        winCombat();
    } else if (gameState.combatState.playerHealth <= 0) {
        loseCombat();
    }
    
    updateUI();
}

// 尝试逃跑
function tryToFlee() {
    if (!gameState.isInCombat || !gameState.currentEnemy) return;
    
    // 50%几率逃跑成功
    const fleeSuccess = Math.random() < 0.5;
    
    if (fleeSuccess) {
        gameState.isInCombat = false;
        gameState.currentEnemy = null;
        alert('成功逃脱！');
    } else {
        // 逃跑失败，受到伤害
        const damage = gameState.currentEnemy.attackPower + Math.floor(Math.random() * 5);
        gameState.combatState.playerHealth = Math.max(0, gameState.combatState.playerHealth - damage);
        
        if (gameState.combatState.playerHealth <= 0) {
            loseCombat();
        }
    }
    
    updateUI();
}

// 战斗胜利
function winCombat() {
    if (!gameState.currentEnemy) return;
    
    // 保存敌人信息用于显示（因为在后面会设为null）
    const enemyName = gameState.currentEnemy.name;
    const experienceReward = gameState.currentEnemy.experienceReward;
    
    // 获得经验值
    gameState.player.experience += gameState.currentEnemy.experienceReward;
    
    // 恢复少量能量
    gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + 5);
    
    gameState.isInCombat = false;
    gameState.currentEnemy = null;
    
    alert(`战胜了${enemyName}！获得${experienceReward}点经验值。`);
    updateUI();
}

// 战斗失败
function loseCombat() {
    gameState.isInCombat = false;
    gameState.currentEnemy = null;
    gameState.combatState.playerHealth = 100;
    
    // 减少能量
    gameState.player.energy = Math.max(0, gameState.player.energy - 20);
    
    alert('在战斗中败北，消耗了额外的能量！');
    updateUI();
}

// 寻找能量补给
function findEnergy() {
    if (!gameState.currentMountain) return;
    
    // 随机找到能量补给
    const energyFound = 10 + Math.floor(Math.random() * 15);
    gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + energyFound);
    
    // 随机获得物品
    const itemChance = Math.random();
    let message = `找到了能量补给，恢复了${energyFound}点能量！`;
    
    if (itemChance < 0.3) {
        gameState.player.inventory.food = Math.min(5, gameState.player.inventory.food + 1);
        message += '\n还找到了一些食物！';
    } else if (itemChance < 0.5) {
        gameState.player.inventory.water = Math.min(5, gameState.player.inventory.water + 1);
        message += '\n还找到了一些水！';
    }
    
    alert(message);
    updateUI();
    saveGameState();
}

// 随机找到能量（在攀登过程中）
function findRandomEnergy() {
    const energyFound = 5 + Math.floor(Math.random() * 10);
    gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + energyFound);
    
    alert(`沿途发现了能量补给，恢复了${energyFound}点能量！`);
}

// 显示美景
function showScenery() {
    if (!gameState.currentMountain || !gameState.currentMountain.sceneries) return;
    
    const sceneries = gameState.currentMountain.sceneries;
    const randomScenery = sceneries[Math.floor(Math.random() * sceneries.length)];
    
    alert(`沿途风景优美，让你精神振奋！\n${gameState.currentMountain.name}的美景让你恢复了少量能量。`);
    
    // 恢复少量能量
    gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + 3);
}

// 使用物品
function useItem(itemType) {
    if (!gameState.player.inventory[itemType] || gameState.player.inventory[itemType] <= 0) {
        alert(`没有${itemType === 'food' ? '食物' : '水'}了！`);
        return;
    }
    
    let energyRestored = 0;
    
    if (itemType === 'food') {
        energyRestored = 20;
        gameState.player.inventory.food--;
    } else if (itemType === 'water') {
        energyRestored = 15;
        gameState.player.inventory.water--;
    }
    
    gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + energyRestored);
    
    alert(`使用了${itemType === 'food' ? '食物' : '水'}，恢复了${energyRestored}点能量！`);
    updateUI();
    saveGameState();
}

// 到达山顶
function reachSummit() {
    if (!gameState.currentMountain) return;
    
    alert(`恭喜你成功登顶${gameState.currentMountain.name}！准备接受知识问答挑战。`);
    
    // 开始知识问答
    startQuiz();
}

// 开始知识问答
function startQuiz() {
    const questions = QUIZ_QUESTIONS.filter(q => q.mountainId === gameState.currentMountain.id);
    if (questions.length === 0) {
        // 如果没有特定问题，随机选择一个问题
        finishMountain();
        return;
    }
    
    const question = questions[Math.floor(Math.random() * questions.length)];
    displayQuiz(question);
}

// 显示问答
function displayQuiz(question) {
    document.getElementById('quizQuestion').textContent = question.question;
    document.getElementById('labelA').textContent = question.optionA;
    document.getElementById('labelB').textContent = question.optionB;
    document.getElementById('labelC').textContent = question.optionC;
    document.getElementById('labelD').textContent = question.optionD;
    
    // 清除之前的选择
    document.querySelectorAll('input[name="quizAnswer"]').forEach(input => {
        input.checked = false;
    });
    
    // 显示问答界面
    document.getElementById('mountainSelection').style.display = 'none';
    document.getElementById('climbingView').style.display = 'none';
    document.getElementById('combatView').style.display = 'none';
    document.getElementById('quizView').style.display = 'block';
}

// 提交答案
function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="quizAnswer"]:checked');
    if (!selectedAnswer) {
        alert('请选择一个答案！');
        return;
    }
    
    // 获取当前显示的问题
    const questionText = document.getElementById('quizQuestion').textContent;
    const currentQuestion = QUIZ_QUESTIONS.find(q => q.question === questionText);
    
    const isCorrect = selectedAnswer.value === currentQuestion.correctAnswer;
    
    if (isCorrect) {
        gameState.player.experience += currentQuestion.points;
        alert(`回答正确！获得${currentQuestion.points}点经验值。`);
    } else {
        alert(`回答错误！正确答案是${currentQuestion.correctAnswer}。`);
    }
    
    finishMountain();
}

// 完成山峰挑战
function finishMountain() {
    if (!gameState.currentMountain) return;
    
    // 增加玩家等级（如果完成的是当前等级）
    const level = MOUNTAIN_LEVELS.find(l => l.id === gameState.currentMountain.levelId);
    if (level && level.order === gameState.player.level) {
        gameState.player.level = Math.min(8, gameState.player.level + 1);
    }
    
    // 重置状态
    gameState.currentMountain = null;
    gameState.progress = 0;
    gameState.isInCombat = false;
    gameState.currentEnemy = null;
    
    alert('恭喜完成本次登山挑战！');
    
    updateUI();
    saveGameState();
}

// 能量耗尽处理
function handleEnergyDepletion() {
    if (!gameState.currentMountain) return;
    
    // 增加失败次数
    const level = MOUNTAIN_LEVELS.find(l => l.id === gameState.currentMountain.levelId);
    if (level) {
        gameState.player.failures[level.order - 1]++;
        
        // 如果失败次数超过3次，降低等级
        if (gameState.player.failures[level.order - 1] >= 3) {
            gameState.player.level = Math.max(1, gameState.player.level - 1);
            gameState.player.failures[level.order - 1] = 0;
            alert('失败次数过多，等级下降了！');
        }
    }
    
    // 重置能量
    gameState.player.energy = gameState.player.maxEnergy;
    gameState.progress = 0;
    
    alert('能量耗尽，需要重新开始攀登！');
    
    updateUI();
    saveGameState();
}

// 重新开始游戏
function restartGame() {
    if (confirm('确定要重新开始游戏吗？所有进度将丢失。')) {
        // 重置游戏状态
        gameState = {
            player: {
                level: 1,
                experience: 0,
                energy: 100,
                maxEnergy: 100,
                failures: [0, 0, 0, 0, 0, 0, 0, 0],
                inventory: {
                    food: 3,
                    water: 2
                }
            },
            currentMountain: null,
            progress: 0,
            isInCombat: false,
            currentEnemy: null,
            combatState: {
                playerHealth: 100,
                enemyHealth: 0
            },
            timeStarted: new Date(),
            timeElapsed: 0
        };
        
        // 清除计时器
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
        }
        
        // 重新开始计时
        startTimer();
        
        // 更新UI
        updateUI();
        saveGameState();
        
        alert('游戏已重新开始！');
    }
}