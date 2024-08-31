<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service')
            ->constrained();
            $table->foreignId('user')
                ->constrained()
                ->cascadeOnDelete();
            $table->text('content');
            $table->timestamps();
            $table->index(['service', 'user']);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
