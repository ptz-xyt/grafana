// Code generated - EDITING IS FUTILE. DO NOT EDIT.
//
// Generated by:
//     kinds/gen.go
// Using jennies:
//     SchemaRegistryJenny
//
// Run 'make gen-cue' from repository root to regenerate.

package kind

import (
	"github.com/grafana/kindsys"
	"strings"
	"time"
)

kindsys.Core
name:        "LibraryPanel"
maturity:    "experimental"
description: "A standalone panel"
lineage: {
	seqs: [{
		schemas: [{
			@grafana(TSVeneer="type")

			// Folder UID
			folderUid?: string @grafanamaturity(ToMetadata="sys")

			// Library element UID
			uid: string

			// Panel name (also saved in the model)
			name: strings.MinRunes(1) & {
				string
			}

			// Panel description
			description?: string

			// The panel type (from inside the model)
			type: strings.MinRunes(1) & {
				string
			}

			// Dashboard version when this was saved (zero if unknown)
			schemaVersion?: uint16

			// panel version, incremented each time the dashboard is updated.
			version: int64 @grafanamaturity(NeedsExpertReview)

			// TODO: should be the same panel schema defined in dashboard
			// Typescript: Omit<Panel, 'gridPos' | 'id' | 'libraryPanel'>;
			model: {
				...
			}

			// Object storage metadata
			meta?: #LibraryElementDTOMeta @grafanamaturity(ToMetadata="sys")
			#LibraryElementDTOMetaUser: {
				id:        int64
				name:      string
				avatarUrl: string
			} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)
			#LibraryElementDTOMeta: {
				folderName:          string
				folderUid:           string @grafanamaturity(ToMetadata="sys")
				connectedDashboards: int64
				created:             time.Time & {
					string
				}
				updated: time.Time & {
					string
				}
				createdBy: #LibraryElementDTOMetaUser @grafanamaturity(ToMetadata="sys")
				updatedBy: #LibraryElementDTOMetaUser @grafanamaturity(ToMetadata="sys")
			} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)
		}]
	}]
}