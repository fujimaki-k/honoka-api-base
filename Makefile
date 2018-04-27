SOURCE := src
DESTINATION := dest
SOURCES := $(wildcard $(SOURCE)/*)
JAVASCRIPTS := $(shell find $(SOURCE) -iname *.js | grep -v node_modules)
TYPESCRIPTS := $(shell find $(SOURCE) -iname *.ts | grep -v node_modules)

define build
	$(eval BUILD_DIRECTORY = $(subst $(SOURCE), $(DESTINATION), $1))
	$(eval TARGET = $(notdir $(BUILD_DIRECTORY)))
	@cp $1/package.json $(BUILD_DIRECTORY)

	@echo "\n"
	@echo "--- Build: $(TARGET) ---"
	@cd $(BUILD_DIRECTORY); \
	npm install
endef


.PHONY: all
all: $(SOURCES)
ifdef JAVASCRIPTS
	make babel
endif
ifdef TYPESCRIPTS
	make typescript
endif

.PHONY: babel
babel: $(SOURCES)
	./node_modules/.bin/babel --out-dir $(DESTINATION) $(SOURCE)

.PHONY: typescript
typescript: $(SOURCES)
	./node_modules/.bin/tsc

.PHONY: clean
install: $(SOURCES)
	$(foreach DIRECTORY, $(SOURCES), $(call build, $(DIRECTORY)))

.PHONY: clean
clean:
	rm -fr $(DESTINATION)

