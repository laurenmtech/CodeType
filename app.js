// Application state
let state = {
    currentSection: 'os',
    currentPromptIndex: 0,
    currentBlankIndex: 0,
    startTime: null,
    timerInterval: null,
    errors: 0,
    correctAnswers: 0,
    totalBlanks: 0,
    isComplete: false,
    answers: [],
    hintsUsed: 0,
    currentHintLevel: 0,
    isProcessing: false,
    reviewQueue: [],
    isReviewMode: false,
    currentPromptHadErrors: false,
    currentPromptUsedHints: false,
    completedPrompts: new Set(),
    masteredPrompts: new Set()
};

// DOM elements
const sectionButtons = document.querySelectorAll('.section-btn');
const textDisplay = document.getElementById('textDisplay');
const typingInput = document.getElementById('typingInput');
const topicTitle = document.getElementById('topicTitle');
const timerDisplay = document.getElementById('timer');
const masteredDisplay = document.getElementById('mastered');
const newTextBtn = document.getElementById('newTextBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsModal = document.getElementById('results');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const hintBtn = document.getElementById('hintBtn');
const reviewBtn = document.getElementById('reviewBtn');

// Initialize
function init() {
    console.log('Initializing CodeType...');
    setupEventListeners();
    loadPrompt();
    typingInput.focus();
}

// Event listeners
function setupEventListeners() {
    sectionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            changeSection(section);
        });
    });

    typingInput.addEventListener('input', handleTyping);
    typingInput.addEventListener('keydown', handleKeyPress);
    newTextBtn.addEventListener('click', loadNewPrompt);
    resetBtn.addEventListener('click', resetPractice);
    hintBtn.addEventListener('click', showHint);
    reviewBtn.addEventListener('click', startReviewMode);
    tryAgainBtn.addEventListener('click', () => {
        resultsModal.style.display = 'none';
        resetPractice();
        typingInput.focus();
    });
}

// Change section
function changeSection(section) {
    state.currentSection = section;
    state.currentPromptIndex = 0;
    state.reviewQueue = [];
    state.isReviewMode = false;
    state.completedPrompts = new Set();
    state.masteredPrompts = new Set();
    
    sectionButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    updateReviewButton();
    updateMasteredDisplay();
    resetPractice();
}

// Load prompt
function loadPrompt() {
    console.log('Loading prompt...');
    
    try {
        const section = sections[state.currentSection];
        if (!section) {
            console.error('Section not found:', state.currentSection);
            return;
        }
        
        const prompt = section.prompts[state.currentPromptIndex];
        if (!prompt) {
            console.error('Prompt not found:', state.currentPromptIndex);
            return;
        }
        
        console.log('Section:', section.name, 'Topic:', prompt.topic);
        
        // Add status indicator to topic title
        let statusIndicator = '';
        if (state.masteredPrompts.has(state.currentPromptIndex)) {
            statusIndicator = ' ✓';
        } else if (state.reviewQueue.includes(state.currentPromptIndex)) {
            statusIndicator = ' 📝';
        } else if (state.completedPrompts.has(state.currentPromptIndex)) {
            statusIndicator = ' •';
        }
        
        const modeIndicator = state.isReviewMode ? ' [REVIEW MODE]' : '';
        
        topicTitle.textContent = `${section.name} - ${prompt.topic}${statusIndicator}${modeIndicator}`;
        
        state.answers = prompt.answers;
        state.totalBlanks = prompt.answers.length;
        state.currentBlankIndex = 0;
        state.currentPromptHadErrors = false;
        state.currentPromptUsedHints = false;
        
        // Split text by ___ to create display with blanks
        const parts = prompt.text.split('___');
        textDisplay.innerHTML = '';
        
        parts.forEach((part, index) => {
            // Add text part
            if (part) {
                const textSpan = document.createElement('span');
                textSpan.className = 'text-part';
                textSpan.textContent = part;
                textDisplay.appendChild(textSpan);
            }
            
            // Add blank (except after last part)
            if (index < parts.length - 1) {
                const blankSpan = document.createElement('span');
                blankSpan.className = 'blank';
                if (index === 0) blankSpan.classList.add('current');
                blankSpan.dataset.index = index;
                blankSpan.textContent = '___';
                textDisplay.appendChild(blankSpan);
            }
        });
        
        state.isComplete = false;
        state.currentHintLevel = 0;
        updateHintButton();
        console.log('Prompt loaded successfully');
    } catch (error) {
        console.error('Error loading prompt:', error);
        textDisplay.innerHTML = '<span class="text-part">Error loading prompt. Please refresh the page.</span>';
    }
}

// Load new prompt
function loadNewPrompt() {
    const section = sections[state.currentSection];
    
    if (state.isReviewMode && state.reviewQueue.length > 0) {
        // In review mode, cycle through review queue
        const currentReviewIndex = state.reviewQueue.indexOf(state.currentPromptIndex);
        const nextReviewIndex = (currentReviewIndex + 1) % state.reviewQueue.length;
        state.currentPromptIndex = state.reviewQueue[nextReviewIndex];
    } else if (state.isReviewMode) {
        // No more items to review, exit review mode
        state.isReviewMode = false;
        updateReviewButton();
        state.currentPromptIndex = (state.currentPromptIndex + 1) % section.prompts.length;
    } else {
        // Normal mode - cycle through all prompts
        state.currentPromptIndex = (state.currentPromptIndex + 1) % section.prompts.length;
    }
    
    resetPractice();
}

// Handle typing
function handleTyping(e) {
    if (state.isComplete || state.isProcessing) return;
    
    // Start timer on first input
    if (!state.startTime) {
        state.startTime = Date.now();
        startTimer();
    }
    
    const inputValue = typingInput.value.trim();
    const correctAnswer = state.answers[state.currentBlankIndex];
    
    // Show live feedback
    const blanks = textDisplay.querySelectorAll('.blank');
    const currentBlank = blanks[state.currentBlankIndex];
    
    if (inputValue.toLowerCase() === correctAnswer.toLowerCase()) {
        currentBlank.classList.remove('incorrect');
        currentBlank.classList.add('correct-preview');
        
        // Auto-advance to next blank after correct answer
        if (!state.isProcessing) {
            state.isProcessing = true;
            setTimeout(() => {
                checkAndMoveNext(inputValue);
                state.isProcessing = false;
            }, 300); // Small delay for visual feedback
        }
    } else if (correctAnswer.toLowerCase().startsWith(inputValue.toLowerCase()) && inputValue.length > 0) {
        currentBlank.classList.remove('incorrect', 'correct-preview');
    } else if (inputValue.length > 0) {
        currentBlank.classList.remove('correct-preview');
        currentBlank.classList.add('incorrect');
    }
}

// Handle key press
function handleKeyPress(e) {
    if (state.isComplete) return;
    
    if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const inputValue = typingInput.value.trim();
        
        if (inputValue.length > 0) {
            checkAndMoveNext(inputValue);
        }
    }
}

// Check answer and move to next
function checkAndMoveNext(inputValue) {
    const correctAnswer = state.answers[state.currentBlankIndex];
    const blanks = textDisplay.querySelectorAll('.blank');
    const currentBlank = blanks[state.currentBlankIndex];
    
    // Check if answer is correct (case-insensitive)
    const isCorrect = inputValue.toLowerCase() === correctAnswer.toLowerCase();
    
    if (isCorrect) {
        state.correctAnswers++;
        currentBlank.classList.remove('current', 'incorrect', 'correct-preview');
        currentBlank.classList.add('correct');
        currentBlank.textContent = correctAnswer;
    } else {
        state.errors++;
        state.currentPromptHadErrors = true;
        currentBlank.classList.remove('current', 'correct-preview');
        currentBlank.classList.add('incorrect');
        currentBlank.textContent = inputValue + ' ✗ (' + correctAnswer + ')';
    }
    
    // Move to next blank
    state.currentBlankIndex++;
    state.currentHintLevel = 0;
    typingInput.value = '';
    
    if (state.currentBlankIndex >= state.totalBlanks) {
        completeSession();
    } else {
        // Highlight next blank
        blanks[state.currentBlankIndex].classList.add('current');
    }
    
    updateHintButton();
}

// Start timer
function startTimer() {
    state.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        timerDisplay.textContent = `${elapsed}s`;
    }, 100);
}

// Show hint
function showHint() {
    if (state.isComplete) return;
    
    const correctAnswer = state.answers[state.currentBlankIndex];
    const answerLength = correctAnswer.length;
    
    state.currentHintLevel++;
    state.hintsUsed++;
    state.currentPromptUsedHints = true;
    
    let hint = '';
    
    // Progressive hint levels
    if (state.currentHintLevel === 1) {
        // Show first letter and length
        hint = correctAnswer[0] + '_'.repeat(answerLength - 1) + ` (${answerLength} letters)`;
    } else if (state.currentHintLevel === 2) {
        // Show first half of letters
        const halfLength = Math.ceil(answerLength / 2);
        hint = correctAnswer.substring(0, halfLength) + '_'.repeat(answerLength - halfLength);
    } else {
        // Show full answer
        hint = correctAnswer;
        typingInput.value = correctAnswer;
    }
    
    // Display hint below input
    let hintDisplay = document.getElementById('hintDisplay');
    if (!hintDisplay) {
        hintDisplay = document.createElement('div');
        hintDisplay.id = 'hintDisplay';
        hintDisplay.className = 'hint-display';
        typingInput.parentNode.insertBefore(hintDisplay, typingInput.nextSibling);
    }
    
    hintDisplay.textContent = `💡 Hint: ${hint}`;
    hintDisplay.style.display = 'block';
    
    updateHintButton();
    typingInput.focus();
}

// Update hint button text
function updateHintButton() {
    if (state.currentHintLevel === 0) {
        hintBtn.textContent = '💡 Hint';
    } else if (state.currentHintLevel === 1) {
        hintBtn.textContent = '💡 More Hint';
    } else if (state.currentHintLevel === 2) {
        hintBtn.textContent = '💡 Show Answer';
    } else {
        hintBtn.textContent = '💡 Hint';
        hintBtn.disabled = true;
    }
    
    // Hide hint display when moving to new blank
    if (state.currentHintLevel === 0) {
        const hintDisplay = document.getElementById('hintDisplay');
        if (hintDisplay) {
            hintDisplay.style.display = 'none';
        }
        hintBtn.disabled = false;
    }
}

// Complete session
function completeSession() {
    state.isComplete = true;
    clearInterval(state.timerInterval);
    
    // Track prompt performance
    const promptKey = `${state.currentSection}-${state.currentPromptIndex}`;
    state.completedPrompts.add(state.currentPromptIndex);
    
    // Add to review queue if had errors or used hints
    if (state.currentPromptHadErrors || state.currentPromptUsedHints) {
        if (!state.reviewQueue.includes(state.currentPromptIndex)) {
            state.reviewQueue.push(state.currentPromptIndex);
        }
    } else {
        // Mastered this prompt
        state.masteredPrompts.add(state.currentPromptIndex);
        // Remove from review queue if it was there
        const index = state.reviewQueue.indexOf(state.currentPromptIndex);
        if (index > -1) {
            state.reviewQueue.splice(index, 1);
        }
    }
    
    const elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
    
    // Show quick stats notification
    const needsReview = state.currentPromptHadErrors || state.currentPromptUsedHints;
    showQuickStats(elapsedSeconds, state.errors, state.hintsUsed, needsReview);
    
    updateReviewButton();
    updateMasteredDisplay();
    
    // Auto-advance to next prompt after a short delay
    setTimeout(() => {
        loadNewPrompt();
    }, 2000);
}

// Show quick stats notification
function showQuickStats(time, errors, hints, needsReview) {
    let statsNotification = document.getElementById('statsNotification');
    if (!statsNotification) {
        statsNotification = document.createElement('div');
        statsNotification.id = 'statsNotification';
        statsNotification.className = 'stats-notification';
        document.querySelector('.container').appendChild(statsNotification);
    }
    
    const statusIcon = needsReview ? '📝' : '✅';
    const statusText = needsReview ? 'Needs Review' : 'Mastered!';
    
    statsNotification.innerHTML = `
        <div class="stats-notification-content">
            <h3>${statusIcon} ${statusText}</h3>
            <div class="quick-stats">
                <span><strong>${time}s</strong> Time</span>
                ${errors > 0 ? `<span><strong>${errors}</strong> Errors</span>` : ''}
                ${hints > 0 ? `<span><strong>${hints}</strong> Hints</span>` : ''}
            </div>
        </div>
    `;
    
    statsNotification.style.display = 'block';
    
    // Hide after 1.8 seconds
    setTimeout(() => {
        statsNotification.style.display = 'none';
    }, 1800);
}

// Reset practice
function resetPractice() {
    clearInterval(state.timerInterval);
    
    state.currentBlankIndex = 0;
    state.startTime = null;
    state.errors = 0;
    state.correctAnswers = 0;
    state.totalBlanks = 0;
    state.isComplete = false;
    state.answers = [];
    state.hintsUsed = 0;
    state.currentHintLevel = 0;
    state.isProcessing = false;
    state.currentPromptHadErrors = false;
    state.currentPromptUsedHints = false;
    
    typingInput.value = '';
    typingInput.disabled = false;
    
    timerDisplay.textContent = '0s';
    
    loadPrompt();
    typingInput.focus();
}

// Start review mode
function startReviewMode() {
    if (state.reviewQueue.length === 0) {
        alert('No items to review! Great job!');
        return;
    }
    
    state.isReviewMode = true;
    state.currentPromptIndex = state.reviewQueue[0];
    updateReviewButton();
    resetPractice();
}

// Update review button
function updateReviewButton() {
    if (!reviewBtn) return;
    
    const reviewCount = state.reviewQueue.length;
    
    if (state.isReviewMode) {
        reviewBtn.textContent = `📝 Reviewing (${reviewCount})`;
        reviewBtn.classList.add('active-review');
    } else if (reviewCount > 0) {
        reviewBtn.textContent = `📝 Review (${reviewCount})`;
        reviewBtn.classList.remove('active-review');
    } else {
        reviewBtn.textContent = '✓ All Mastered';
        reviewBtn.classList.remove('active-review');
        reviewBtn.disabled = true;
        setTimeout(() => {
            reviewBtn.disabled = false;
        }, 1000);
    }
}

// Update mastered display
function updateMasteredDisplay() {
    if (!masteredDisplay) return;
    
    const section = sections[state.currentSection];
    if (!section) return;
    
    const totalPrompts = section.prompts.length;
    const masteredCount = state.masteredPrompts.size;
    
    masteredDisplay.textContent = `${masteredCount}/${totalPrompts}`;
    
    // Change color based on progress
    if (masteredCount === totalPrompts) {
        masteredDisplay.style.color = '#50c878'; // Green
    } else if (masteredCount > totalPrompts / 2) {
        masteredDisplay.style.color = '#ffc107'; // Yellow
    } else {
        masteredDisplay.style.color = '#eaeaea'; // Default
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded');
        setTimeout(init, 100); // Small delay to ensure all scripts loaded
    });
} else {
    console.log('DOM already loaded');
    setTimeout(init, 100);
}
