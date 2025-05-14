# Bangladesh Income Tax Calculator

A simple, user-friendly web application to calculate income tax for individuals in Bangladesh according to the latest tax regulations.

**Live Demo**: [BD Tax Calculator](https://bd-tax-calculator.anichur.com)

## Features

- Calculate income tax based on annual income, gender, and investments
- Calculate tax savings through eligible investments
- Compare tax with and without investments
- Shows optimal tax savings with maximum allowed investments
- Mobile-responsive design
- No server-side processing - all calculations happen in your browser

## How to Use

1. Select your gender (Male, Female, or Senior Citizen)
2. Enter your monthly salary (required)
3. Enter any festival bonus or other income (if applicable)
4. Enter your investment details in the respective fields:
   - Savings Certificates (maximum 500,000 BDT)
   - DPS (maximum 120,000 BDT)
   - Life Insurance Premiums
   - Share Market investments
   - Recognized Provident Fund contributions
   - Other eligible investments
5. Click "Calculate Tax" to see your results

## Tax Calculation Logic

The calculator follows the latest Bangladesh income tax regulations:

- Tax-free thresholds:
  - Male: 350,000 BDT
  - Female/Senior Citizen: 400,000 BDT
- Progressive tax slabs from 5% to 30%
- Investment rebate: Minimum of (15% of investment amount) or (3% of taxable income)
- Maximum allowable investment: 20% of taxable income
- Minimum tax: 5,000 BDT (when taxable income exceeds threshold)

## Technologies Used
- Vue.js 3
- Tailwind CSS
- Vite

## Installation

```bash
# Clone the repository
git clone https://github.com/anisAronno/bd-tax-calculator.git

# Navigate to the directory
cd bd-tax-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This calculator is provided for informational purposes only. While we strive for accuracy, please consult with a tax professional for your specific tax situation. Tax regulations may change, and this calculator may not reflect the most recent changes.

## Author

[Anis Aronno](https://anichur.com)

---

If you find this project helpful, please consider giving it a ⭐ on GitHub!