import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Film,
    Clock,
    Star,
    Filter,
} from 'lucide-react';
import { movies } from '@/data/mockData';

export default function MovieManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [genreFilter, setGenreFilter] = useState('all');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<typeof movies[0] | null>(null);

    const genres = ['All', 'Sci-Fi', 'Action', 'Thriller', 'Romance', 'Drama', 'Adventure', 'Mystery'];

    const filteredMovies = movies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = genreFilter === 'all' || movie.genre.includes(genreFilter);
        return matchesSearch && matchesGenre;
    });

    const handleEdit = (movie: typeof movies[0]) => {
        setSelectedMovie(movie);
        setIsEditDialogOpen(true);
    };

    const MovieForm = ({ movie }: { movie?: typeof movies[0] }) => (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        defaultValue={movie?.title}
                        placeholder="Enter movie title"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                        id="duration"
                        type="number"
                        defaultValue={movie?.duration}
                        placeholder="120"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select defaultValue={movie ? String(movie.rating) : undefined}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="G">G - General</SelectItem>
                            <SelectItem value="PG">PG - Parental Guidance</SelectItem>
                            <SelectItem value="PG-13">PG-13</SelectItem>
                            <SelectItem value="R">R - Restricted</SelectItem>
                            <SelectItem value="NC-17">NC-17</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue={movie?.language}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Korean">Korean</SelectItem>
                            <SelectItem value="Mandarin">Mandarin</SelectItem>
                            <SelectItem value="Malay">Malay</SelectItem>
                            <SelectItem value="Tamil">Tamil</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="genre">Genres</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select genres" />
                    </SelectTrigger>
                    <SelectContent>
                        {genres.slice(1).map((genre) => (
                            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="synopsis">Synopsis</Label>
                <Textarea
                    id="synopsis"
                    defaultValue={movie?.synopsis}
                    placeholder="Enter movie synopsis..."
                    rows={3}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="director">Director</Label>
                    <Input
                        id="director"
                        defaultValue={movie?.director}
                        placeholder="Director name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="releaseDate">Release Date</Label>
                    <Input
                        id="releaseDate"
                        type="date"
                        defaultValue={movie?.releaseDate}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="poster">Poster URL</Label>
                <Input
                    id="poster"
                    defaultValue={movie?.posterUrl}
                    placeholder="https://..."
                />
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex flex-1 gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={genreFilter} onValueChange={setGenreFilter}>
                            <SelectTrigger className="w-40">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {genres.map((genre) => (
                                    <SelectItem key={genre} value={genre.toLowerCase()}>
                                        {genre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Movie
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Movie</DialogTitle>
                                <DialogDescription>
                                    Enter the details for the new movie.
                                </DialogDescription>
                            </DialogHeader>
                            <MovieForm />
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsAddDialogOpen(false)}>
                                    Add Movie
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Movies Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Film className="h-5 w-5" />
                            Movie Catalog ({filteredMovies.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Poster</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Genre</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Language</TableHead>
                                    <TableHead>Release Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMovies.map((movie) => (
                                    <TableRow key={movie.id}>
                                        <TableCell>
                                            <img
                                                src={movie.posterUrl}
                                                alt={movie.title}
                                                className="w-12 h-16 object-cover rounded"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{movie.title}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {movie.genre.map((g) => (
                                                    <Badge key={g} variant="secondary" className="text-xs">
                                                        {g}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                <span>{movie.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>{movie.duration} min</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{movie.language}</TableCell>
                                        <TableCell>{movie.releaseDate}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(movie)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Movie</DialogTitle>
                            <DialogDescription>
                                Update the movie details.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedMovie && <MovieForm movie={selectedMovie} />}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsEditDialogOpen(false)}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
