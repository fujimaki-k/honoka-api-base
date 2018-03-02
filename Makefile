SOURCES := $(wildcard src/*)
JAVASCRIPTS := $(wildcard src/*/*.js)
TYPESCRIPTS := $(wildcard src/*/*.ts)
DESTINATION := dest


define build
	$(eval BUILD_DIRECTORY = $(subst src, dest, $1))
	$(eval TARGET = $(notdir $(BUILD_DIRECTORY)))
	@cp $1/package.json $(BUILD_DIRECTORY)

	@echo "\n"
	@echo "--- Build: $(TARGET) ---"
	@cd $(BUILD_DIRECTORY); \
	npm install
endef


all: $(SOURCES)
ifdef JAVASCRIPTS
	make babel
endif
ifdef TYPESCRIPTS
	make typescript
endif

babel: $(SOURCES)
	./node_modules/.bin/babel --out-dir dest src

typescript: $(SOURCES)
	./node_modules/.bin/tsc

install: $(SOURCES)
	$(foreach DIRECTORY, $(SOURCES), $(call build, $(DIRECTORY)))

.PHONY: clean
clean:
	rm -fr $(DESTINATION)

