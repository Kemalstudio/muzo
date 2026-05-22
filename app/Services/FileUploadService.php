<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    public function storePublicFile(UploadedFile $file, string $directory): string
    {
        $filename = $this->generateFileName($file);
        return $file->storeAs($directory, $filename, 'public');
    }

    public function replacePublicFile(?string $existingPath, UploadedFile $file, string $directory): string
    {
        if ($existingPath) {
            $this->deletePublicFile($existingPath);
        }

        return $this->storePublicFile($file, $directory);
    }

    public function deletePublicFile(?string $path): void
    {
        if (! $path) {
            return;
        }

        Storage::disk('public')->delete($path);
    }

    protected function generateFileName(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $random = Str::random(12);

        return sprintf('%s-%s.%s', $name, $random, $extension);
    }
}
