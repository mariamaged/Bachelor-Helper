# GUC Bachelor Thesis Helper
![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3fvivmjef85cp5UoIVgPbbyGb-bunKdDddZW0mmyyHpVIfLnv7Osq9-GNES-WQhBQPVhDzsxeS1SSjuRS7FsWcVH4NIdCYlo9U04MHTlj1Ar9-JJzHqsTAmkNlXpBm-rlnfyzgJI1rXlyE91QtswVNA=w1006-h350-no?authuser=0)
## Motivation
- I thought about creating this website for combining data related to the bachelor project from the different websites (the `Student intranet` and the `MET Website`) since the `Student Intranet` contains all the valid thesis list but without their respective descriptions, and to organize this data in several ways in order to help me get a full idea about all the thesis.\
&nbsp;
- The data is collected using **`web scraping`** using the **Puppeteer** and **Cheerio** libraries in ***Node.js***.

> Note: Authentication credentials will only be inserted inside the environmental variables file (.env) and will be used by the `htmnl` and `Puppeteer` libraries for authentication. 
> - Therefore, they only reside on your local machine and are not sent anywhere.
> - No data will be fetched unless authentication is successful.

## Usage
1. **Step 1:** Clone the repository.
2. **Step 2:** Open the backend folder > then open the .env file and insert your username and password beside their respective variables that are already there. This is how the latter part of the file should look like. 
   - `Note:` I tried to echo these two lines, and it didn't really work, so I do it manually.
```bash
USER_NAME=<insert_your_username>
PASSWORD=<insert_your_password>
```
3. **Step 3:** Open a new terminal.
4. **Step 4:** Navigate into the backend directory.
```bash
cd backend
```
5. **Step 5:** Install the necessary dependencies found inside the package.json file.
```
npm install
```
6. **Step 6:** Start the server, which scrapes the data and stores it on your machine as .json files.
   - `Note:` The console will print **Done!** when all data is fetched.
```bash
npm start
```
8. **Step 7:** Open a new terminal (without closing the first one).
9. **Step 8:** Navigate into the frontend directory.
```bash
cd frontend
```
10. **Step 9:** Install the necessary dependencies found inside the package.json file.
```bash
npm install
``` 
11. **Step 10:** Start the react app where the page will automatically open on your browser on port 3000. If it doesn't, type `localhost:3000` on the url bar.
```
npm start
```

## Functionalities
	1. View list of thesis.
- The thesis list contains information about the:
   1. Thesis name and supervisor as indicated in the `Student Intranet`.
   2. As well as the category, supervisor name (as written in MET, since some thesis topics have multiple supervisors) and assistant supervisor names as indicated in the `MET website`.
- Any thesis that is not found in the MET website is highlighted in **gray**.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3fj55SJvQEwwDQyXHc1YPGYBFCYy7hL_sgO8fyioq2zbFa-s9eGILgPsH1Hy3805sGYAdnS9c2YdEWQ2nnqz5Ej8HvSMHmCGa_LqeBa8VjzltYvwm8bN3IopsMWf1466R9CDVFjBfTLNkLKcDihglxi=w1006-h487-no?authuser=0)

***
	2. View thesis description by clicking on each expandable/collapsable table row.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3d_zerKJcKypkhVlWIWudua1JxUY9nZXFn5WBNdWcIKcm6Jknxgj0q0OJ87srGpF5JvGsUM3mXdWojshmSDbemN8ZJZgKFJgkmHLsZxTS4O3n1xXJvntG-qq-SfeJIH_C8ZMLnvNYLRKsaM1zYhA4fz=w1006-h525-no?authuser=0)
***
	3. View a separate list for all thesis that are not currently found in MET.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3c_spakEES5hmQ52DE8kEi5BkVbWerPgxZUj4JXnuqWInR0cfgtFzF7Q9mlek0cCT7JrxliKwdMJ43Mk9VyO6kvMFdc-QWBePKhYnE0XvXWWzsIp0NxnbZdJoYza3Rkx-vD9UHaFF8s7gkBgDq6RnBa=w1006-h483-no?authuser=0)

***
	4. Sort both thesis list according to different criteria.
1. Category Ascending.
2. Category Descending.
3. Supervisor Ascending.
4. Supervisor Descending.
5. Thesis Name Ascending.
6. Thesis Name Descending.
7. ID Ascending.
8. ID Descending.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3fIbpC8jc3PCjZQQ6LOCuG23-o9f74VHWH7UAOM2gPij3EwvCHZy54BFsxehI7ucY08sVzeXAYlAHJBoQHMGC_wG42fL7u8dNeEx-I-iJgzKCVcZfxpNNnIpR3fiipiitqJYAgf14RxgoapzfxdQk_M=w1006-h510-no?authuser=0)
***
	5. View thesis per category.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3eeZ8pgla1FA_5CneuKhUTQG0KGJS3NQD0Y7wY4mAbNrZXl9hvbdMymjN2rCK5wudAVwrOfU1AA1Ov323Aj-liJXOJAaOnFyZw_k-dqmrXc_XLB0vZ9Kb8_bM1gN6l_n50jZM6MM35AV0R8svuMAy__=w974-h599-no?authuser=0)
***
	6. View thesis per supervisor.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3d3b8awWgAA_4zHOvSWAVU4-TSx61SnprU0XeSPAMGu5bvU-ueIw6eAs_93IBiDUa3SUrMBEY9tWW1Y_aJi_oaSMB5RT2Sn0syFdp0HEXrdlg31JyKrRa2FB4b3sPQxo2aIkHxopDM8K3tvcel2EcL5=w970-h561-no?authuser=0)
***
	7. View general statistics.
1. Number of thesis per category.
2. Number of thesis per supervisor.
3. Total number of thesis.
4. Number of thesis not found in MET.

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3dCnQZfvFZun7Tvcik7C7sXb-AsPNhrTbeWsyUh0Q3k7h4M9tlDbeR4YZSX-H8RAtWNd3QOcMfTII-2QnqWcNghv5hm-afOSv8vswPE9X9lX_mwFx0sxRy_JAx2rEe2zqkXx5Zy32yyVYz9TgDfLQRN=w1006-h203-no?authuser=0)

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3dkJPIizt0Bsj4REeqTSTrfC0QhoZeJlhX4eWFV7WrYfIHm94_62VvHUn1bPKEHms9lSh2FDFWS41ZqR7CuvmGQygzDkHAOac-ZIkYKwxpaQuLG8AzdxFwL_pnyjrv4IZ0tr06DyPfve8YMEcnuk0WB=w1006-h418-no?authuser=0)

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3eM-WqR65j690Yo7VCDqQDMXB27s800K05fUHf8bE1bfm1tVQCIwl3-lSeJUOEhS0NzwyZRpxbDYB6b-bSOA1WzC-uefWmXg0Z_INCqiOxeqzigpQDkVIj2zvqiCdZz6KEKP6YlEp51L6JAktIbSdSO=w1002-h564-no?authuser=0)