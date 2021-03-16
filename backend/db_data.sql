
INSERT INTO `admins` (`id`, `fname`, `lname`, `email`, `password`, `hospital_id`, `createdAt`, `updatedAt`) VALUES
(1, 'AdminHospOne', 'one', 'admin1@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$hibHAysK/fNPLQSgQKG/Iw$S0vBMmQMyWJGieLY8tH0NCkYKow3aHPgsLcYHms3SHQ', 1, '2021-03-07 08:31:57', '2021-03-07 08:31:57'),
(2, 'AdminHospOne', 'two', 'admin2@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$SWlOgjra1i4OnEbwLZTwzQ$zynFFdm13YLoJepdyHoQQMRsXjRKT2FUjjSqHZTJYSw', 1, '2021-03-07 08:32:04', '2021-03-07 08:32:04'),
(3, 'AdminHospOne', 'three', 'admin3@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$W0i1QGwhWgCFd0Zc0L0DZw$Ewpn2olqjsAlpi5iEQxErUj+PCHBJqTPs/LDlu3Ykgs', 1, '2021-03-07 08:32:22', '2021-03-07 08:32:22'),
(4, 'AdminHospTwo', 'one', 'admin21@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$PXNbXhhG+WZDA/moHsgE2Q$BCAFj2fokKXg2v8yR7+/LWC3ZKC8v3fxcd8DD2iYcfc', 2, '2021-03-07 08:35:37', '2021-03-07 08:35:37'),
(5, 'AdminHospTwo', 'two', 'admin22@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 2, '2021-03-07 08:35:51', '2021-03-07 08:35:51'),
(6, 'AdminHospTwo', 'three', 'admin23@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$rZ8NPxwT9sCazfjNOhqwjg$bXm4AlxAzBF7nHsOjB4GSPIOwRWUyojZxV9Rxw++ugQ', 2, '2021-03-07 08:35:56', '2021-03-07 08:35:56'),
(7, 'AdminHospThree', 'three', 'admin33@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$tLxEECkbrBZsjCbS8b5LlQ$ZrZVDOSjr146CmIeV1AU02di09/rNR7EqCMOU/HnqKY', 3, '2021-03-07 08:36:18', '2021-03-07 08:36:18'),
(8, 'AdminHospThree', 'two', 'admin32@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$0jSIdQt8CFsAB7bH7txb9A$g64nL83OrKPv2H3MRNI5C6Ua4kxdktwAewrWl00ljvE', 3, '2021-03-07 08:36:24', '2021-03-07 08:36:24'),
(9, 'AdminHospThree', 'one', 'admin31@nhs.net', '$argon2i$v=19$m=4096,t=3,p=1$eHnlZOwHPvWBqZ2LqYDG6A$D4sR7koGrmMs9GGOg8nF713aqw/0Kl89ZP8B0LgBIXg', 3, '2021-03-07 08:36:30', '2021-03-07 08:36:30');


INSERT INTO `doctors` (`id`, `fname`, `lname`, `email`, `password`, `hospital_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Doctor Hosp One', 'One ', 'doctor11@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 1, '2021-03-07 13:06:42', '2021-03-07 13:06:42'),
(2, 'Doctor Hosp Two', 'One', 'doctor21@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 2, '2021-03-07 13:06:42', '2021-03-07 13:06:42'),
(3, 'Doctor Hosp Three', 'One', 'doctor31@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 3, '2021-03-07 13:06:42', '2021-03-07 13:06:42'),
(4, 'Doctor Hosp One', 'Two ', 'doctor12@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 1, '2021-03-07 13:06:42', '2021-03-07 13:06:42'),
(5, 'Doctor Hosp Two', 'Two ', 'doctor22@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 2, '2021-03-07 13:06:42', '2021-03-07 13:06:42'),
(6, 'Doctor Hosp Three', 'Two ', 'doctor32@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', 3, '2021-03-07 13:06:42', '2021-03-07 13:06:42');



INSERT INTO `doctor_patient_relations` (`id`, `doctor_id`, `patient_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2021-03-07 13:17:38', '2021-03-07 13:17:38'),
(2, 1, 2, '2021-03-07 13:17:38', '2021-03-07 13:17:38'),
(3, 1, 3, '2021-03-07 13:17:38', '2021-03-07 13:17:38'),
(4, 4, 4, '2021-03-07 13:17:38', '2021-03-07 13:17:38'),
(5, 4, 5, '2021-03-07 13:17:38', '2021-03-07 13:17:38'),
(6, 4, 6, '2021-03-07 13:17:38', '2021-03-07 13:17:38'),
(7, 2, 1, '2021-03-07 13:17:38', '2021-03-07 13:17:38');


INSERT INTO `hospitals` (`id`, `name`, `contact_email`, `createdAt`, `updatedAt`) VALUES
(1, 'Hospital-1', 'hospital1@nhs.net', '2021-03-07 08:20:56', '2021-03-07 08:20:56'),
(2, 'Hospital-2', 'hospital2@nhs.net', '2021-03-07 08:21:11', '2021-03-07 08:21:11'),
(3, 'Hospital-3', 'hospital3@nhs.net', '2021-03-07 08:21:36', '2021-03-07 08:21:36');


INSERT INTO `patients` (`id`, `fname`, `lname`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Patient One ', 'Doctor', 'patient1@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(2, 'Patient Two ', 'Doctor', 'patient2@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(3, 'Patient Three ', 'Doctor', 'patient3@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(4, 'Patient Four ', 'Doctor', 'patient4@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(5, 'Patient Five ', 'Doctor', 'patient5@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(6, 'Patient Six ', 'Doctor', 'patient6@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(7, 'Patient Seven ', 'Doctor', 'patient7@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(8, 'Patient Eight ', 'Doctor', 'patient8@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(9, 'Patient Nine ', 'Doctor', 'patient9@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06'),
(10, 'Patient Ten ', 'Doctor', 'patient10@nhs.co.uk', '$argon2i$v=19$m=4096,t=3,p=1$1dqyXSSNp4j6F99kCghjOQ$U04ObVGxhDonL6eXmDZCm2GBBst2wdgGSsIXsiQBank', '2021-03-07 13:14:06', '2021-03-07 13:14:06');

