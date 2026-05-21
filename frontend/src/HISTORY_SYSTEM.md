# Recently Played History System - Implementation Complete

## Overview
A comprehensive play history system has been implemented for the Muzo music streaming platform. This system tracks which songs users have played, records timestamps, and provides detailed history views and analytics.

## Backend Implementation

### 1. Database
**Migration:** `database/migrations/2026_05_20_000007_create_track_listens_table.php`

Schema:
```sql
CREATE TABLE track_listens (
  id BIGINT PRIMARY KEY,
  user_id BIGINT FOREIGN KEY → users(id),
  track_id BIGINT FOREIGN KEY → tracks(id),
  listened_at TIMESTAMP,
  ip_address VARCHAR(45),
  client_context JSON,
  INDEX(track_id, user_id),
  INDEX(listened_at)
)
```

### 2. Models
**User.php:**
```php
public function listens()
{
  return $this->hasMany(Listen::class);
}
```

**Listen.php:** Already configured with relationships to User and Track

**Track.php:** Already has relationship to Listen

### 3. API Controller
**File:** `app/Http/Controllers/Api/HistoryController.php`

Endpoints:

#### **GET /api/v1/me/history**
Fetch user's recently played tracks (unique, ordered by most recent)
- Query param: `limit` (default: 50)
- Returns: paginated list with artist and album relations

#### **GET /api/v1/me/history/grouped**
Get play history grouped by date with smart date labels
- Returns: Array of date groups (Today, Yesterday, Monday, etc.)
- Each group contains tracks played on that date
- Automatically de-duplicates by track_id

#### **GET /api/v1/me/history/stats**
Get play history statistics
- total_plays: Total number of plays recorded
- unique_tracks: Number of unique tracks played
- top_track: Most played track with play count
- top_track_plays: Number of plays for top track

#### **POST /api/v1/tracks/{id}/play**
Record a play event for a track
- Request: `{ track_id, context? }`
- Auto-increments track's play_count
- Records: timestamp, IP address, client context
- Returns: Created listen record

#### **DELETE /api/v1/me/history**
Clear user's entire play history
- Returns: Confirmation with deleted count

### 4. Features
- **Unique Track De-duplication:** History shows unique tracks only
- **Smart Date Grouping:** Groups by Today/Yesterday/Week/Month/Year
- **Client Context:** Stores playback context (source, player type, etc.)
- **IP Tracking:** Records user IP for analytics
- **Play Count Increment:** Automatically updates track.play_count
- **Pagination:** Returns 50 results per page by default

### 5. Routes
**File:** `routes/api.php`

All protected via `auth:sanctum`:
```php
Route::get('me/history', [HistoryController::class, 'index']);
Route::get('me/history/grouped', [HistoryController::class, 'groupedByDate']);
Route::get('me/history/stats', [HistoryController::class, 'stats']);
Route::post('tracks/{track}/play', [HistoryController::class, 'store']);
Route::delete('me/history', [HistoryController::class, 'clear']);
```

## Frontend Implementation

### 1. Service Layer
**File:** `frontend/src/services/historyService.js`

Functions:
- `fetchHistory(limit)` - Get recently played tracks
- `fetchHistoryGroupedByDate()` - Get grouped history by date
- `fetchHistoryStats()` - Get play statistics
- `recordPlay(trackId, context)` - Record a play event
- `clearHistory()` - Clear play history

### 2. Zustand Store
**File:** `frontend/src/store/useHistoryStore.js`

State:
```javascript
{
  history: [],              // Array of listen objects
  historyGrouped: [],       // Grouped by date
  stats: null,              // Statistics data
  loading: false,           // Loading state
  error: null               // Error messages
}
```

Actions:
- `setHistory(tracks)` - Set all history
- `setHistoryGrouped(grouped)` - Set grouped history
- `setStats(stats)` - Set statistics
- `addToHistory(track)` - Add track to recent history (de-duplicates)
- `removeFromHistory(trackId)` - Remove from history
- `clearHistory()` - Clear all history
- `getRecentTracks(limit)` - Get X recent unique tracks

### 3. Custom Hooks

#### `useRecentlyPlayed.js`
Fetches and manages recently played tracks:
```javascript
const { history, loading, error } = useRecentlyPlayed(limit)
```
Features:
- Lazy initialization (loads once)
- Auto-loads on component mount
- Customizable limit
- Error handling

#### `useHistoryData.js`
Fetches grouped history and statistics:
```javascript
const { historyGrouped, stats, loading, error } = useHistoryData()
```
Features:
- Parallel fetches (grouped + stats)
- Smart date grouping
- Analytics data

#### `useRecordPlay.js`
Records play events when tracks are played:
```javascript
const { recordPlayback } = useRecordPlay()
```
Features:
- Optimistic updates
- API sync
- Error handling with rollback

### 4. UI Components

#### **RecentlyPlayedCard** (`components/history/RecentlyPlayedCard.jsx`)
Compact card for showing recently played track
- Music icon placeholder
- Track title and artist
- Play button overlay
- Hover effects

### 5. Pages

#### **History Page** (`pages/History.jsx`)
Full recently played history view at `/history`:

Features:
- **Hero Section:**
  - Navigation back
  - Stats display (total plays, unique songs, top track)
  
- **Statistics Cards:**
  - Total Plays count
  - Unique Songs count
  - Top Track name and play count

- **Grouped History:**
  - Organized by date (Today, Yesterday, etc.)
  - Responsive table layout
  - Track number, title, artist, duration
  - Play button for each track
  - Like button for each track

- **Clear History:**
  - Clear button in header
  - Confirmation dialog
  - Deletes all play records

- **Empty State:**
  - Clock icon
  - Helpful message
  - Encouragement to start playing

Styling:
- Responsive grid layout
- Smooth transitions
- Date-based grouping
- Hover effects on tracks

### 6. Home Page Updates
**File:** `pages/Home.jsx`

New "Recently Played" section:
- Shows top 6 recently played tracks
- Uses RecentlyPlayedCard component
- Link to full history page
- Grid layout: 1 col mobile, 3 cols tablet, 6 cols desktop

### 7. Navigation

**Routes:** `routes/AppRoutes.jsx`
- `/history` - Protected route for History page

**Sidebar:** `components/layout/Sidebar.jsx`
- Added "Recently Played" navigation link
- Links to `/history`

### 8. Player Integration
**File:** `components/player/PlayerBar.jsx`

Integration:
- Records play when track starts playing
- Uses `useRecordPlay` hook
- Tracks recorded track ID to prevent duplicate records
- Optimistic update to store
- Syncs with API asynchronously

## User Workflows

### Viewing Recently Played
1. Navigate to "Recently Played" in sidebar
2. Or navigate to `/history`
3. See all played tracks organized by date
4. View statistics (total plays, unique songs, top track)

### Playing Tracks from History
1. View recently played page
2. Click play icon on any track
3. Or use the play button overlay

### Clearing History
1. Open recently played page
2. Click "Clear History" button
3. Confirm deletion
4. History cleared

### Home Page Recently Played
1. View Home page
2. See "Recently Played" section
3. Shows 6 most recent unique tracks
4. Click "View All" to see full history

## State Flow

```
PlayerBar Component
  ↓
Track starts playing
  ↓
useRecordPlay Hook
  ↓
recordPlayback(track)
  ↓
useHistoryStore.addToHistory()
  ↓
recordPlay API call
  ↓
Backend: Create Listen record
  ↓
Increment Track.play_count
  ↓
User views /history
  ↓
useHistoryData Hook
  ↓
Fetch grouped history + stats
  ↓
Display organized by date
```

## Performance Optimizations

1. **Unique De-duplication:**
   - Store handles duplicates in memory
   - API returns unique tracks only

2. **Lazy Loading:**
   - History only fetches once
   - Subsequent requests use store

3. **Batch Grouping:**
   - API groups by date server-side
   - Reduces client processing

4. **Incremental Updates:**
   - Player records plays optimistically
   - Updates sync with API asynchronously

5. **Indexed Queries:**
   - Database indexes on track_id, user_id, listened_at
   - Fast historical lookups

## Error Handling

- Try/catch blocks on all operations
- User-friendly error messages
- Loading states during operations
- Graceful fallbacks for failed requests
- Error recovery with retry logic

## Features Breakdown

### Current Plays Recording
- Automatic when track starts
- Records timestamp, IP, context
- Prevents duplicate records within session
- Updates track play count

### History Viewing
- List all played tracks
- Grouped by date with smart labels
- Sort options (implicitly by date)
- Unique track de-duplication
- Responsive layout

### Statistics
- Total plays
- Unique tracks
- Top track with play count
- Useful for analytics

### Date Grouping
- Today
- Yesterday  
- Current week (by day name)
- Current year (by date)
- Previous years (with full date)

## API Contracts

### POST /api/v1/tracks/{id}/play
Request:
```json
{
  "track_id": 1,
  "context": { "source": "web" }
}
```

Response (201):
```json
{
  "message": "Play recorded",
  "listen": {
    "id": 1,
    "user_id": 1,
    "track_id": 1,
    "listened_at": "2026-05-21T10:30:00Z",
    "track": { ... }
  }
}
```

### GET /api/v1/me/history/grouped
Response (200):
```json
{
  "data": [
    {
      "date": "2026-05-21",
      "day_label": "Today",
      "tracks": [ ... ]
    },
    {
      "date": "2026-05-20",
      "day_label": "Yesterday",
      "tracks": [ ... ]
    }
  ]
}
```

### GET /api/v1/me/history/stats
Response (200):
```json
{
  "total_plays": 42,
  "unique_tracks": 18,
  "top_track": {
    "id": 1,
    "title": "Song Name",
    "artist": { ... }
  },
  "top_track_plays": 5
}
```

## Testing Checklist

✅ User can play a track
✅ Play is recorded to history
✅ Play count increments
✅ History appears in /history
✅ History organized by date
✅ Statistics calculated correctly
✅ Clear history works
✅ Recently played appears on Home
✅ De-duplication works (no duplicate tracks)
✅ Smart date labels work
✅ Responsive design on all breakpoints
✅ Error handling works
✅ Loading states display

## Database Performance

- `track_listens` indexed on `(track_id, user_id)` for fast filtering
- `listened_at` indexed for date-based queries
- Cascade delete on user/track deletion
- Null ip_address and context for privacy

## File Structure

**Backend:**
- ✅ `app/Http/Controllers/Api/HistoryController.php` [NEW]
- ✅ `routes/api.php` [UPDATED]
- Models already configured

**Frontend:**
- ✅ `services/historyService.js` [NEW]
- ✅ `store/useHistoryStore.js` [NEW]
- ✅ `hooks/useRecentlyPlayed.js` [NEW]
- ✅ `hooks/useHistoryData.js` [NEW]
- ✅ `hooks/useRecordPlay.js` [NEW]
- ✅ `components/history/RecentlyPlayedCard.jsx` [NEW]
- ✅ `pages/History.jsx` [NEW]
- ✅ `pages/Home.jsx` [UPDATED]
- ✅ `components/player/PlayerBar.jsx` [UPDATED]
- ✅ `routes/AppRoutes.jsx` [UPDATED]
- ✅ `components/layout/Sidebar.jsx` [UPDATED]

## Future Enhancements

1. **Time-Based Views:**
   - Last 7 days
   - Last 30 days
   - Last 90 days
   - Custom date range

2. **Advanced Analytics:**
   - Most played artists
   - Most played genres
   - Top genres by plays
   - Listening patterns (peak hours)

3. **Recommendations:**
   - Based on listen history
   - Similar to top played tracks
   - Discovery from history

4. **Export:**
   - Download history as CSV/JSON
   - Export statistics reports

5. **Sharing:**
   - Share history with friends
   - Compare listening habits
   - Collaborative playlists from history

6. **Playback Continuity:**
   - Resume from last position in track
   - Continue from last played track

7. **History Filtering:**
   - Filter by artist
   - Filter by album
   - Filter by genre
   - Custom searches in history

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- localStorage for persistence (optional)
- CSS Grid and Flexbox

## Notes

- Play recording happens optimistically (immediate UI update)
- API sync happens asynchronously
- Duplicate prevention per track per session
- Client IP tracked for analytics
- Context data allows tracking play source

## Database Considerations

- Listen records accumulate over time
- Can archive old records (before 2 years)
- Consider partitioning by date for large tables
- Regular index maintenance recommended
- Foreign key constraints ensure data integrity
