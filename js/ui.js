// 更新用户界面
function updateUI() {
    updatePlayerStatus();
    updateMountainView();
    updateCombatView();
    updateLevelProgress();
    updateButtons();
}

// 更新玩家状态显示
function updatePlayerStatus() {
    document.getElementById('currentLevel').textContent = gameState.player.level;
    document.getElementById('experience').textContent = gameState.player.experience;
    
    const level = gameState.currentMountain ? 
        MOUNTAIN_LEVELS.find(l => l.id === gameState.currentMountain.levelId) : null;
    
    const currentLevelIndex = level ? level.order - 1 : 0;
    document.getElementById('failures').textContent = gameState.player.failures[currentLevelIndex];
    
    document.getElementById('foodCount').textContent = gameState.player.inventory.food;
    document.getElementById('waterCount').textContent = gameState.player.inventory.water;
    
    // 更新能量条
    const energyPercent = (gameState.player.energy / gameState.player.maxEnergy) * 100;
    const energyBar = document.getElementById('energyBar');
    energyBar.style.width = energyPercent + '%';
    energyBar.textContent = `${gameState.player.energy} / ${gameState.player.maxEnergy}`;
    energyBar.className = 'progress-bar ' + 
        (energyPercent > 60 ? 'bg-success' : energyPercent > 30 ? 'bg-warning' : 'bg-danger');
}

// 更新山峰视图
function updateMountainView() {
    const mountainSelection = document.getElementById('mountainSelection');
    const climbingView = document.getElementById('climbingView');
    const combatView = document.getElementById('combatView');
    const quizView = document.getElementById('quizView');
    const gameOverView = document.getElementById('gameOverView');
    
    // 隐藏所有视图
    mountainSelection.style.display = 'none';
    climbingView.style.display = 'none';
    combatView.style.display = 'none';
    quizView.style.display = 'none';
    gameOverView.style.display = 'none';
    
    if (gameState.isInCombat) {
        combatView.style.display = 'block';
        updateCombatUI();
    } else if (gameState.currentMountain) {
        climbingView.style.display = 'block';
        updateClimbingUI();
    } else {
        mountainSelection.style.display = 'block';
    }
}

// 更新攀登界面
function updateClimbingUI() {
    if (!gameState.currentMountain) return;
    
    document.getElementById('mountainTitle').textContent = gameState.currentMountain.name;
    document.getElementById('mountainImage').src = gameState.currentMountain.imageUrl;
    document.getElementById('mountainHeight').textContent = gameState.currentMountain.height;
    document.getElementById('mountainStory').textContent = gameState.currentMountain.story;
    
    // 更新难度显示
    const difficultyStars = '★'.repeat(gameState.currentMountain.difficulty) + 
                           '☆'.repeat(5 - gameState.currentMountain.difficulty);
    document.getElementById('mountainDifficulty').textContent = difficultyStars;
    
    // 更新进度条
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = gameState.progress + '%';
    progressBar.textContent = gameState.progress + '%';
    
    // 更新风景图片轮播
    updateSceneryCarousel();
}

// 更新风景图片轮播
function updateSceneryCarousel() {
    if (!gameState.currentMountain || !gameState.currentMountain.sceneries) return;
    
    const carouselInner = document.getElementById('sceneryImages');
    carouselInner.innerHTML = '';
    
    gameState.currentMountain.sceneries.forEach((scenery, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const carouselItem = `
            <div class="carousel-item ${activeClass}">
                <img src="${scenery}" class="d-block w-100 scenery-image" alt="Scenery ${index + 1}">
            </div>
        `;
        carouselInner.innerHTML += carouselItem;
    });
}

// 更新战斗界面
function updateCombatView() {
    if (!gameState.isInCombat || !gameState.currentEnemy) return;
    
    updateCombatUI();
}

// 更新战斗UI
function updateCombatUI() {
    if (!gameState.currentEnemy) return;
    
    document.getElementById('enemyName').textContent = gameState.currentEnemy.name;
    document.getElementById('enemyImage').src = gameState.currentEnemy.imageUrl;
    document.getElementById('enemyHealth').textContent = gameState.combatState.enemyHealth;
    
    // 更新生命值条
    const playerHealthPercent = gameState.combatState.playerHealth;
    const enemyHealthPercent = gameState.combatState.enemyHealth;
    
    document.getElementById('playerHealth').textContent = gameState.combatState.playerHealth;
    document.getElementById('playerHealthBar').style.width = playerHealthPercent + '%';
    document.getElementById('playerHealthBar').className = 'progress-bar ' + 
        (playerHealthPercent > 60 ? '' : playerHealthPercent > 30 ? 'bg-warning' : 'bg-danger');
    
    document.getElementById('enemyHealthBar').style.width = enemyHealthPercent + '%';
}

// 更新等级进度
function updateLevelProgress() {
    const progressContainer = document.getElementById('levelProgress');
    progressContainer.innerHTML = '';
    
    MOUNTAIN_LEVELS.forEach(level => {
        const isCompleted = level.order < gameState.player.level;
        const isCurrent = level.order === gameState.player.level;
        const isLocked = level.order > gameState.player.level;
        
        const levelHtml = `
            <div class="d-flex align-items-center mb-2">
                <div class="mr-2">
                    <span class="badge badge-${level.color}">第${level.order}级</span>
                </div>
                <div class="flex-grow-1">
                    <small>${level.name}</small>
                    <div class="level-indicator ${isCompleted ? 'completed' : isCurrent ? 'current' : 'locked'}"></div>
                </div>
                ${isLocked ? '<i class="fas fa-lock text-muted"></i>' : ''}
                ${isCompleted ? '<i class="fas fa-check-circle text-success"></i>' : ''}
            </div>
        `;
        
        progressContainer.innerHTML += levelHtml;
    });
}

// 更新按钮状态
function updateButtons() {
    const climbBtn = document.getElementById('climbBtn');
    const findEnergyBtn = document.getElementById('findEnergyBtn');
    const useFoodBtn = document.getElementById('useFoodBtn');
    const useWaterBtn = document.getElementById('useWaterBtn');
    
    const hasMountain = !!gameState.currentMountain;
    const isInCombat = gameState.isInCombat;
    const hasFood = gameState.player.inventory.food > 0;
    const hasWater = gameState.player.inventory.water > 0;
    
    // 更新按钮启用状态
    climbBtn.disabled = !hasMountain || isInCombat;
    findEnergyBtn.disabled = !hasMountain || isInCombat;
    useFoodBtn.disabled = !hasMountain || isInCombat || !hasFood;
    useWaterBtn.disabled = !hasMountain || isInCombat || !hasWater;
}