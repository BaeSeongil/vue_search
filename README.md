# vue_bbs
### 게시판 엘라스틱서치 템플릿
```
PUT /_template/temp_emate_bbs?include_type_name=false
{
	"order": 1,
	"index_patterns": [
		"emate_bbs"
	],
	"settings": {
		"index.mapping.total_fields.limit": 100000,
		"index": {
			"max_result_window": "10000000",
			"refresh_interval": "1s",
			"number_of_shards": "5",
			"number_of_replicas": "0",
			"analysis": {
				"analyzer": {
					"my_customer_ngram_analyzer": {
						"filter": [
							"lowercase",
							"classic",
							"trim"
						],
						"tokenizer": "my_customer_ngram_tokenizer"
					}
				},
				"tokenizer": {
					"my_customer_ngram_tokenizer": {
						"type": "ngram"
					}
				}
			},
			"blocks": {
				"read_only_allow_delete": false
			}
		}
	},
	"mappings": {
		"dynamic_date_formats": [
			"yyyyMMdd'T'HHmmss"
		],
		"dynamic_templates": [
			{
				"integers": {
					"match_mapping_type": "long",
					"mapping": {
						"type": "long"
					}
				}
			},
			{
				"dates": {
					"match_mapping_type": "date",
					"mapping": {
						"type": "date",
						"format": "yyyyMMdd'T'HHmmss"
					}
				}
			},
			{
				"strings": {
					"match_mapping_type": "string",
					"mapping": {
						"type": "keyword",
						"fields": {
							"contains": {
								"type": "text"
							},
							"search": {
								"search_analyzer": "my_customer_ngram_analyzer",
								"analyzer": "my_customer_ngram_analyzer",
								"type": "text"
							}
						}
					}
				}
			}
		]
	}
}
```
