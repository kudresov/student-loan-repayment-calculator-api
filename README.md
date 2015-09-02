# Student Loand repayment API

# Calculation

## Historical rates
Rates are based on [studentloanrepayment.co.uk]

|Historical interest rates          |%   |period (days)|
|:----------------------------------|----|------------:|
|2014/15                            |1.5 |             |
|2013/14                            |1.5 |             |
|2012/13                            |1.5 |             |
|2011/12                            |1.5 |             |
|2010/11                            |1.5 |             |
|2009/10                            |0.0 |             |
|6 March 2009 - 31 August 2009      |1.5 |179          |
|6 February 2009 - 5 March 2009     |2.0 |28           |
|9 January 2009 - 5 February 2009   |2.5 |28           |
|5 December 2008 - 8 January 2009   |3.0 |30           |
|1 September 2008 - 4 December 2008 |3.8 |95           |
|2007/08                            |4.8 |             |
|2006/07                            |2.4 |             |
|2005/06                            |3.2 |             |
|2004/05                            |2.6 |             |
|2003/04                            |3.1 |             |
|2002/03                            |1.3 |             |
|2001/02                            |2.3 |             |
|2000/01                            |2.6 |             |
|1999/00                            |2.1 |             |
|1998/99                            |3.5 |             |

## 2008-2009 interest rates
As it the interest rates varied in 2008-2009 they are calculated based on following formula:

- `l` - loan
- `i1` - interest rate 1
- `i1l` - interest 1 rate length

- `1pi = (l * i1 / 365 * i1l)` - 1st period interest
- `totoalInterest = 1pi + 2pi + 3pi + npi`

## Tests
Run `gulp test:auto` to execute test continiously.
Run `gulp test` to execute test once.

[studentloanrepayment.co.uk]: http://www.studentloanrepayment.co.uk/portal/page?_pageid=93,6678642&_dad=portal&_schema=PORTAL