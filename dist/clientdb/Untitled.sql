CREATE TABLE `info` (
  `appid` text NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `appicon` text,
  PRIMARY KEY (`appid`)
);

INSERT INTO `info` (`appid`,`name`,`description`,`appicon`) VALUES ('nYrnfYEv','testApp','A simple test application','{“1x”:”https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/Art/star120_processed_2x.png”}');