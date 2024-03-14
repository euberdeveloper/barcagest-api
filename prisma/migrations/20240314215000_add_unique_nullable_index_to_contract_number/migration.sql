-- Manually written, add unique partial index 
CREATE UNIQUE INDEX IF NOT EXISTS parking_contract_number_unique_nullable
ON "parking"("contract_number")
WHERE "contract_number" IS NOT NULL;