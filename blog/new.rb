foo = ["i", "love", "to", "code"]

foo.map { |word| word.upcase }
# => ["I", "LOVE", "TO", "CODE"]

foo.map(&:upcase)
# => ["I", "LOVE", "TO", "CODE"]


class Symbol
  def to_proc
    Proc.new { |obj, *args| obj.send(self, *args) }
  end
end

:upcase.to_proc
# => { |word| word.send(:upcase)}


[3, 2, 7, 5].inject { |sum, x| sum + x}
# => 17

[3, 2, 7, 5].inject(&:+)
# is equivalent to
[3, 2, 7, 5].inject { |sum, x| sum.send(:+, x)}


letter = "o"
foo.select { |word| word.include?(letter)}
# => ["love", "to", "code"]

#if only THIS could be done!
#foo.select(&:include?)  with letter passed as argument

#could this be possible?
#foo.select(&[:include?, letter])


Array.respond_to?(:to_proc)
# => false

class Array
  def to_proc
    method = self.shift
    args = self
    Proc.new { |x, *others| x.send(method, *(others + args))}
  end
end


stuff = [3, "corn", 6, 34, "gorilla", :four]

stuff.select(&[:is_a?, Integer])
# => [3, 6, 34]

stuff.select(&[:is_a?, String])
# => ["corn", "gorilla"]


letter = "t"

i_want_pets = ["I", "want", 3, "pets", "but", "only", "have", 2]

i_want_pets.map(&:to_s).select(&[:include?, letter])
# => ["want", "pets", "but"]



