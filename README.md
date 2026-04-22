"# ShopKeeper Pro 🏪

An interactive Profit & Loss game built with React and Vite for mastering quantitative aptitude concepts. Test your business acumen across 9 challenging scenarios with real-world profit/loss calculations.

## 🎮 Game Features

- **9 Interactive Scenarios** across 3 difficulty levels
  - Level 1: Beginner 🌱 (Basic P&L calculations)
  - Level 2: Trader 📊 (Markup, Discount, Successive operations)
  - Level 3: Business Guru 🏆 (Advanced traps, false weights, complex scenarios)

- **Gamified Experience**
  - Starting capital: ₹10,000
  - Correct answer: +₹1,000 coins (+ streak bonus)
  - Wrong answer: -₹500 coins
  - Real-time score and money tracking
  - Fire streak counter for consecutive correct answers

- **Learning Tools**
  - Hint system for each question (no penalty)
  - Formula explanation after each answer
  - Comprehensive formula cheatsheet
  - Score breakdown with answer review

- **Professional Header**
  - GitHub profile integration
  - Social media links (LinkedIn & GitHub)
  - One-click access to creator's profiles

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/NiksheyYadav/Profit-loss-game.git
cd Profit-loss-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 📚 Formulas Covered

| Concept | Formula |
|---------|---------|
| Profit % | (SP - CP) / CP × 100 |
| Loss % | (CP - SP) / CP × 100 |
| Selling Price (Profit) | CP × (100 + P%) / 100 |
| Cost Price (from SP) | SP × 100 / (100 + P%) |
| Markup + Discount | x - y - (x × y) / 100 |
| Same SP Trap | Loss% = (common%)² / 100 |
| False Weight Trap | (True Weight - False Weight) / False Weight × 100 |

## 🎯 Game Scenarios

### Level 1: Beginner 🌱
1. **Apple Vendor** - Basic profit calculation
2. **Shoe Shop** - Loss calculation
3. **Mobile Store** - Finding selling price

### Level 2: Trader 📊
4. **Clothing Store** - Markup and discount combined
5. **Electronics Deal** - Successive discounts
6. **Sports Shop** - Finding cost price

### Level 3: Business Guru 🏆
7. **Dishonest Dealer** - False weights trap
8. **Classic Trap** - Same price, different profit/loss
9. **Final Boss** - Complex multi-item calculation

## 🛠️ Technology Stack

- **Frontend**: React 19.2.5
- **Build Tool**: Vite 8.0.9
- **Styling**: Inline CSS with CSS animations
- **State Management**: React Hooks (useState, useEffect)
- **API**: GitHub API (for profile data)

## 📱 Features Breakdown

### Responsive Design
- Works seamlessly on desktop and mobile
- Dark theme gradient background
- Smooth animations and transitions

### Interactive Elements
- Dynamic option buttons with visual feedback
- Answer confirmation system
- Formula reveal with explanations
- Progress bar showing game completion

### Data Persistence
- Real-time score tracking
- Money counter with formatting
- Streak counter for motivation
- Answer history with correct/incorrect indicators

## 🔗 Connect

- **GitHub**: [@NiksheyYadav](https://github.com/NiksheyYadav)
- **LinkedIn**: [Nikshey Yadav](https://www.linkedin.com/in/nikshey-yadav-51143224a/)

---

**Creator**: Nikshay Yadav | 231302221 | B.Tech CSE(DS) | SGT University, Gurugram

## 📄 License

This project is open source and available under the ISC License.

## 🙌 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 🌐 Deployment

This project is deployed on Netlify. Visit the live demo: [ShopKeeper Pro](https://profit-loss-game.netlify.app/)" 
