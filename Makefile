# ARGS = $(filter-out $@,$(MAKECMDGOALS))
# MAKEFLAGS += --silent

test/%:
	@echo "[ info ] exec "$@
	@echo "  [ exec ] eslint "$@
	@node ./node_modules/eslint/bin/eslint.js ./$@.js --config .eslintrc.json
	@echo "  [ exec ] mocha "$@
	@mocha --ui bdd --ignore ./test/*/**.test.js --timeout 30000 --exit ./$@.js

test/clean:
	@echo "[ info ] exec rm "$@
	rm ./test/db.json
	@echo ""

logs:
	@echo "[ info ] exec rm ./*.log"
	rm *.log

setup: test/app test/api

clean: tmp/users tmp/authentication logs
