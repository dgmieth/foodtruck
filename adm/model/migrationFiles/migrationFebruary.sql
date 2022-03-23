CREATE TABLE `tips` (
  `order_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `paidIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reimbursed` int NOT NULL DEFAULT '0'
)
ALTER TABLE kungfuBBQ_test.tips ADD CONSTRAINT tips_FK FOREIGN KEY (order_id) REFERENCES kungfuBBQ_test.`order`(id);
ALTER TABLE kungfuBBQ_test.tips ADD CONSTRAINT tips_FK_1 FOREIGN KEY (user_id) REFERENCES kungfuBBQ_test.`user`(id);
/*new databse object*/
INSERT INTO {XXXXXXXXXXXXXXXX}.SYSTEMLOG_dbObject (`object`,description,createdBy)
	VALUES ('tips','Databse table tips',3);