INSERT INTO department (name)
(`sales`, ),
(`hr`, ),
(`management`, ),
(`security`, ),
(`marketing`, ),
(`customer service`, );

INSERT INTO  role (title, salary, department_id)
(`salesman`, `50,000`, `1`),
(`recruiter`, `60,000`, `2`),
(`manager`, `70,000`, `3`),
(`officer`, `40,000`, `4`),
(`assisant`, `30,000`, `5`),
(`associate`, `20,000`, `6`);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
(`Alexis`, `Smith`, `salesman`, ),
(`Kayla`, `Jones`, `recruiter`, ),
(`Jesse`, `Martinez`, `manager`, ),
(`Mark`, `Johnson`, `officer`, ),
(`David`, `Garcia`, `assistant`, ),
(`Sarah`, `Sanchez`, `associate`, );